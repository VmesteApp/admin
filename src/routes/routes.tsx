import NaviBar from '../components/navibar.tsx'

import { Pages } from '../pages/index.tsx'
interface RouteConfig {
	path: string
	element: React.ReactElement
	children?: RouteConfig[]
}

const COMMON_ROUTES: RouteConfig[] = [
	{
		path: '/',
		element: <Pages.Auth />,
	},
]

const PUBLIC_ROUTES: RouteConfig[] = [
	{
		path: '/',
		element: <Pages.Auth />,
		children: [...COMMON_ROUTES, { path: '*', element: <Pages.Auth /> }],
	},
]

const PRIVATE_ROUTES: RouteConfig[] = [
	{
		path: '/',
		element: <NaviBar />,
		children: [
			{ path: '/admins', element: <Pages.SuperAdmin /> },
			{ path: 'pulses', element: <Pages.Pulses /> },
			{ path: 'tags', element: <Pages.Tags /> },
			{ path: 'complaints', element: <Pages.Complaints /> },
			...COMMON_ROUTES,
		],
	},
]

export { PUBLIC_ROUTES, PRIVATE_ROUTES }
