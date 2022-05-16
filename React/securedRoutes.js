import { lazy } from 'react';

const Locations = lazy(() => import('../pages/dashboard/locations/Locations'));

const locations = [
    {
        path: '/locations',
        name: 'Locations',
        element: Locations,
        roles: ['Admin', 'User'],
        exact: true,
        isAnonymous: false,
    },
];

const allRoutes = [
    ...locations
];

export default allRoutes;
