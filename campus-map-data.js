/*
 * Ohashi Campus 2.5D plan data.
 *
 * The reference image is the official Kyushu University Ohashi campus plan.
 * Every building and landmark below is entered in that image's pixel space
 * first, then projected into the Three.js scene. This keeps the pickup pins
 * attached to the same footprints as the printed campus map.
 */
(function exposeCampusMapData() {
    const reference = {
        image: 'assets/ohashi-campus-plan-reference.png',
        width: 670,
        height: 590,
        worldWidth: 134,
        worldDepth: 118,
        opacity: 0,
        render: false
    };

    const mapPoint = (px, py) => [
        (px - reference.width / 2) * (reference.worldWidth / reference.width),
        (py - reference.height / 2) * (reference.worldDepth / reference.height)
    ];

    const mapPolygon = (pixels) => pixels.map(([px, py]) => mapPoint(px, py));

    const refRect = (id, left, top, right, bottom, height, tone = 'default', label = '') => ({
        id,
        shape: mapPolygon([
            [left, top],
            [right, top],
            [right, bottom],
            [left, bottom]
        ]),
        height,
        tone,
        label,
        referenceBounds: { left, top, right, bottom }
    });

    const refLane = (id, left, top, right, bottom) => ({
        id,
        shape: mapPolygon([
            [left, top],
            [right, top],
            [right, bottom],
            [left, bottom]
        ]),
        tone: 'path'
    });

    const treeAt = (px, py, scale = 1) => {
        const [x, z] = mapPoint(px, py);
        return { x, z, scale };
    };

    window.RERE_CORDS_CAMPUS_MAP = {
        reference,
        referenceAnchors: {
            'bldg-1': { center: [544, 247], relation: 'east of central lawn' },
            'bldg-2': { center: [418, 250], relation: 'west of central lawn' },
            'bldg-5': { center: [316, 235], relation: 'southwest of central lawn' },
            'bldg-7': { center: [257, 367], relation: 'south of sports field' },
            library: { center: [363, 432], relation: 'south of Building 6' },
            'bldg-8': { center: [438, 486], relation: 'southwest of Building 1' }
        },
        bounds: { minX: -24, maxX: 54, minZ: -34, maxZ: 54 },
        ground: {
            boundary: mapPolygon([
                [220, 130], [600, 130], [600, 560], [220, 560]
            ]),
            paths: [
                refLane('central-west-walk', 280, 322, 296, 518),
                refLane('central-axis', 378, 176, 393, 535)
            ],
            lawns: [
                {
                    id: 'north-courtyard',
                    shape: mapPolygon([[355, 142], [493, 150], [550, 230], [540, 318], [445, 326], [350, 270]]),
                    tone: 'lawn'
                },
                {
                    id: 'south-green-buffer',
                    shape: mapPolygon([[340, 430], [520, 423], [557, 535], [326, 527]]),
                    tone: 'lawn'
                }
            ]
        },
        buildings: [
            /* Key pickup locations follow the official plan, but remain pure boxes. */
            refRect('bldg-7', 240, 318, 274, 419, 8, 'hub', '7'),
            refRect('bldg-5', 289, 168, 328, 285, 8, 'default', '5'),
            refRect('bldg-2', 390, 190, 445, 309, 8, 'default', '2'),
            refRect('bldg-1', 522, 188, 566, 307, 8, 'default', '1'),
            refRect('library', 339, 383, 383, 501, 5, 'default', 'LIB'),
            /* The exhibition listing refers to the multi-dimensional design hall. */
            refRect('bldg-8', 399, 429, 488, 545, 8, 'exhibit', '8'),

            /* Keep only the central context mass; the 1/2 area stays open. */
            refRect('bldg-6', 292, 303, 349, 370, 5, 'context')
        ],
        landmarks: [
            {
                id: 'central-lawn',
                type: 'circle',
                center: { x: mapPoint(475, 242)[0], z: mapPoint(475, 242)[1] },
                radius: 6,
                tone: 'lawn'
            },
            {
                id: 'fountain-court',
                type: 'fountain',
                center: { x: mapPoint(425, 372)[0], z: mapPoint(425, 372)[1] },
                radius: 4.8
            },
            {
                id: 'design-court',
                type: 'circle',
                center: { x: mapPoint(392, 328)[0], z: mapPoint(392, 328)[1] },
                radius: 4.1,
                tone: 'lawn'
            },
            { id: 'tree-groups', type: 'trees', tone: 'tree' }
        ],
        trees: [
            treeAt(392, 328, 1.15)
        ],
        markers: [
            { locationKey: 'bldg-7-hub', buildingId: 'bldg-7', offset: { x: 0.25, z: -0.28 }, floor: 2, tone: 'hub' },
            { locationKey: 'bldg-1', buildingId: 'bldg-1', offset: { x: 0.2, z: 0.2 }, floor: 2, tone: 'poster' },
            { locationKey: 'bldg-2', buildingId: 'bldg-2', offset: { x: 0.18, z: -0.08 }, floor: 2, tone: 'poster' },
            { locationKey: 'bldg-5', buildingId: 'bldg-5', offset: { x: -0.2, z: 0.16 }, floor: 1, tone: 'poster' },
            { locationKey: 'bldg-7-1f', buildingId: 'bldg-7', offset: { x: -0.22, z: 0.24 }, floor: 1, tone: 'poster' },
            { locationKey: 'library', buildingId: 'library', offset: { x: -0.18, z: 0.15 }, floor: 1, tone: 'poster' },
            { locationKey: 'bldg-8', buildingId: 'bldg-8', offset: { x: -0.18, z: 0.16 }, floor: 2, tone: 'exhibit' }
        ],
        views: {
            overview: {
                camera: { x: -77, y: 115, z: 99 },
                target: { x: 18, y: 2, z: 12 }
            },
            'bldg-7-hub': {
                camera: { x: -77, y: 62, z: 70 },
                target: { x: -15, y: 4, z: 13 }
            },
            'bldg-1': {
                camera: { x: 98, y: 61, z: 53 },
                target: { x: 39, y: 4, z: -8 }
            },
            'bldg-2': {
                camera: { x: -42, y: 57, z: 58 },
                target: { x: 16, y: 4, z: -11 }
            },
            'bldg-5': {
                camera: { x: -70, y: 59, z: 30 },
                target: { x: -4, y: 4, z: -11 }
            },
            'bldg-7-1f': {
                camera: { x: -77, y: 62, z: 70 },
                target: { x: -15, y: 4, z: 13 }
            },
            library: {
                camera: { x: -58, y: 57, z: 63 },
                target: { x: 5, y: 4, z: 27 }
            },
            'bldg-8': {
                camera: { x: -30, y: 62, z: 92 },
                target: { x: 21, y: 4, z: 38 }
            }
        }
    };
})();
