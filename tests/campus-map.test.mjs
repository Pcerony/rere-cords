import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const read = (file) => readFileSync(resolve(root, file), 'utf8');

test('homepage loads the dedicated campus layout data before app logic', () => {
    const html = read('index.html');
    assert.match(html, /campus-map-data\.js\?v=7"><\/script>\s*<script src="submission-config\.js/);
});

test('campus layout contains the official spatial landmarks and six anchored locations', () => {
    const data = read('campus-map-data.js');

    for (const landmark of ['central-lawn', 'fountain-court', 'tree-groups']) {
        assert.match(data, new RegExp(`id: ['"]${landmark}['"]`));
    }

    for (const location of ['bldg-1', 'bldg-2', 'bldg-5', 'bldg-7-1f', 'library', 'bldg-7-hub']) {
        assert.match(data, new RegExp(`locationKey: ['"]${location}['"]`));
    }
});

test('campus layout follows the official reference map with rectangular building footprints', () => {
    const data = read('campus-map-data.js');

    assert.match(data, /image: 'assets\/ohashi-campus-plan-reference\.png'/);
    assert.match(data, /render: false/);
    assert.match(data, /'bldg-1': \{ center: \[544, 247\], relation: 'east of central lawn' \}/);
    assert.match(data, /'bldg-2': \{ center: \[418, 250\], relation: 'west of central lawn' \}/);
    for (const building of ['bldg-1', 'bldg-2', 'bldg-5', 'bldg-7', 'library', 'bldg-8']) {
        assert.match(data, new RegExp(`refRect\\('${building}'`));
    }
    assert.doesNotMatch(data, /refPolygon\(\s*'bldg-/);
});

test('the 5 building stays compact and the 1/2 area has no stray context masses', () => {
    const data = read('campus-map-data.js');

    assert.match(data, /refRect\('bldg-5', 289, 168, 328, 285, 8, 'default', '5'\)/);
    for (const contextMass of ['bldg-3', 'bldg-4', 'workshop', 'east-context']) {
        assert.doesNotMatch(data, new RegExp(`refRect\\('${contextMass}'`));
    }
});

test('the overview keeps only the central building group and the fountain-side tree', () => {
    const data = read('campus-map-data.js');

    assert.doesNotMatch(data, /id: 'sports-field'/);
    assert.doesNotMatch(data, /id: 'tennis-court'/);
    assert.doesNotMatch(data, /refRect\('gym'/);
    assert.match(data, /trees:\s*\[\s*treeAt\(392, 328, 1\.15\)\s*\]/);
    for (const tree of ['475, 242', '534, 342', '242, 466', '566, 466']) {
        assert.doesNotMatch(data, new RegExp(`treeAt\\(${tree}`));
    }
    assert.match(data, /target: \{ x: 18, y: 2, z: 12 \}/);
});

test('the desktop map keeps a square viewport beside a persistent location panel', () => {
    const styles = read('styles.css');

    assert.match(styles, /\.campus-map-tool\s*\{[\s\S]*?display: grid;/);
    assert.match(styles, /grid-template-columns:\s*minmax\(0, 1\.32fr\) minmax\(19rem, 0\.88fr\);/);
    assert.match(styles, /\.campus-map-stage\s*\{[\s\S]*?aspect-ratio:\s*1\s*\/\s*1;/);
    assert.match(styles, /\.map-navigation-row\s*\{[\s\S]*?grid-template-rows:\s*auto minmax\(0, 1fr\);/);
    assert.match(styles, /\.map-detail-surface\s*\{[\s\S]*?overflow:\s*auto;/);
    assert.match(styles, /@media\s*\(max-width:\s*820px\)[\s\S]*?\.map-navigation-row\s*\{[\s\S]*?display:\s*block;/);
    assert.doesNotMatch(styles, /\.map-stage-controls\s*\{/);
});

test('the map shows one selected-location photo as a floating overlay', () => {
    const html = read('index.html');
    const app = read('app.js');
    const styles = read('styles.css');

    assert.match(html, /data-i18n="map-title">唱片领取点地图/);
    assert.doesNotMatch(html, /class="campus-map-badge"/);
    assert.doesNotMatch(html, /class="campus-map-lead"/);
    assert.match(html, /id="map-photo-panel"[^>]*hidden/);
    assert.match(html, /id="map-photo-grid"/);
    for (const photo of ['b1.JPG', 'b2.JPG', 'b5.JPG', 'b7-1f.JPG', 'b7-2f.JPG']) {
        assert.match(app, new RegExp(`素材/地点/${photo.replace('.', '\\.')}`));
    }
    assert.match(app, /id: 'b2',[\s\S]*?locationKey: 'bldg-2',[\s\S]*?src: '\.\/素材\/地点\/b2\.JPG'/);
    assert.doesNotMatch(app, /素材\/地点\/b3\.JPG/);
    assert.match(app, /function updateMapPhotoPanel\(/);
    assert.match(app, /CAMPUS_LOCATION_PHOTOS\.find\(\(candidate\) => candidate\.locationKey === locationKey\)/);
    assert.match(app, /grid\.replaceChildren\(\);[\s\S]*?if \(!photo\) return;/);
    assert.match(app, /new ResizeObserver\(handleResize\)/);
    assert.doesNotMatch(styles, /grid-template-rows:\s*minmax\(0, 1fr\) minmax\(0, 0\.62fr\);/);
    assert.match(styles, /\.map-photo-panel\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?bottom:/);
    assert.match(styles, /\.map-photo-panel\s*\{[\s\S]*?border:\s*0;/);
    assert.match(styles, /\.map-photo-grid\s*\{[\s\S]*?display:\s*block;/);
    assert.doesNotMatch(styles, /grid-template-columns:\s*repeat\(5, minmax\(0, 1fr\)\);/);
});

test('the map uses recognizable floating record markers and labels', () => {
    const app = read('app.js');

    assert.match(app, /CAMPUS_MAP_LABELS/);
    assert.match(app, /createFloatingLocationLabel/);
    assert.match(app, /new THREE\.CylinderGeometry\(1\.45, 1\.45, 0\.24, 32\)/);
    assert.match(app, /markerHub: new THREE\.MeshStandardMaterial\(\{ color: 0x526647/);
    assert.match(app, /markerExhibit: new THREE\.MeshStandardMaterial\(\{ color: 0xC15535/);
    assert.match(app, /const labelLift = marker\.locationKey === 'bldg-7-hub' \? 2\.4 : 0;/);
    assert.match(app, /sprite\.position\.set\(0, 1 \+ stemHeight \+ 4\.6 \+ labelLift, 0\)/);
    assert.match(app, /window\.updateCampusMapLabels/);
    assert.doesNotMatch(app, /new THREE\.OctahedronGeometry\(/);
});

test('the map disables manual orbit input while keeping marker clicks available', () => {
    const app = read('app.js');

    assert.match(app, /controls\.enabled = false;/);
    assert.match(app, /controls\.enableRotate = false;/);
    assert.match(app, /controls\.enableZoom = false;/);
    assert.match(app, /controls\.enablePan = false;/);
    assert.match(app, /intersections\.length \? 'pointer' : 'default'/);
});

test('the campus model uses an all-white material system', () => {
    const app = read('app.js');
    assert.match(app, /ground: new THREE\.MeshStandardMaterial\(\{ color: 0xFFFFFF/);
    assert.match(app, /field: new THREE\.MeshStandardMaterial\(\{ color: 0xFFFFFF/);
    assert.match(app, /contextBuilding: new THREE\.MeshStandardMaterial\(\{ color: 0xFFFFFF/);
    assert.match(app, /treeCanopy: new THREE\.MeshStandardMaterial\(\{ color: 0xFFFFFF/);
    assert.match(app, /new THREE\.BoxGeometry\(width, building\.height, depth\)/);
    assert.match(app, /new THREE\.SphereGeometry\(/);
    assert.match(app, /const sunLight = new THREE\.DirectionalLight\(0xFFFFFF/);
    assert.match(app, /new THREE\.HemisphereLight\(0xFFFFFF, 0xB8B8B8/);
    assert.match(app, /new THREE\.AmbientLight\(0xF0F0F0/);
    assert.match(app, /context\.fillStyle = '#171717'/);
    assert.doesNotMatch(app, /0xFFF9EE|0x4B5149|0xA8ADA3|0xE1E6DD|#293129|#535B52/);
});

test('map renderer consumes layout anchors instead of arbitrary location coordinates', () => {
    const app = read('app.js');
    assert.match(app, /RERE_CORDS_CAMPUS_MAP/);
    assert.match(app, /createCampusLayout/);
    assert.match(app, /createReferencePlan/);
    assert.match(app, /reference\.render === false/);
    assert.doesNotMatch(app, /createPin3D\([\s\S]*?-36, 16\.5, 8/);
});

test('map markup keeps the location list and persistent detail panel beside the viewport', () => {
    const html = read('index.html');
    assert.match(html, /class="[^"]*\bcampus-map-tool\b[^"]*"/);
    assert.doesNotMatch(html, /id="map-reset-btn"/);
    assert.doesNotMatch(html, /id="map-exhibition-btn"/);
    assert.match(html, /id="map-location-index"/);
    assert.match(html, /id="map-nav-pills"/);
    assert.match(html, /data-location="all"/);
    for (const location of ['bldg-7-hub', 'bldg-1', 'bldg-2', 'bldg-5', 'bldg-7-1f', 'library', 'bldg-8']) {
        assert.match(html, new RegExp(`data-location="${location}"`));
    }
    assert.match(html, /id="map-detail-panel"/);
    assert.doesNotMatch(html, /id="map-detail-panel"[^>]*hidden/);
    assert.match(html, /aria-label="Campus map"/);
    assert.doesNotMatch(html, /class="map-legend"/);
});

test('the exhibition location uses the official multi-dimensional facility name', () => {
    const app = read('app.js');
    const html = read('index.html');

    assert.match(app, /"bldg-8": \{[\s\S]*?多次元设计实验栋/);
    assert.match(app, /"bldg-8": \{[\s\S]*?多次元デザイン実験棟/);
    assert.match(html, /data-i18n="loc-bldg8">多次元 · 展览/);
    assert.match(app, /"loc-bldg8": \{[\s\S]*?"zh": "多次元 · 展览"/);
});
