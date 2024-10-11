import Admin from '../pages/admin.tsx'
import Profiles from '../pages/profiles.tsx'
import Auth from '../pages/auth.tsx'
import NaviBar from '../components/navibar.tsx'
import Pulses from '../pages/pulses.tsx'
import Tags from '../pages/tags.tsx'
import SuperAdmin from '../pages/adminSuper.tsx'
import { hasRole } from '../helpers/checkAuth.ts'

interface RouteConfig {
	path: string
	element: React.ReactElement
	children?: RouteConfig[]
}

const COMMON_ROUTES: RouteConfig[] = [
	{
		path: '/',
		element: <Auth />,
	},
]

const PUBLIC_ROUTES: RouteConfig[] = [
	{
		path: '/',
		element: <Auth />,
		children: [...COMMON_ROUTES, { path: '*', element: <Auth /> }],
	},
]

const PRIVATE_ROUTES: RouteConfig[] = [
	{
		path: '/',
		element: <NaviBar />,
		children: [
			{
				path: '/',
				element: hasRole('superadmin') ? <SuperAdmin /> : <Admin />,
			},
			{ path: 'profiles', element: <Profiles /> },
			{ path: 'pulses', element: <Pulses /> },
			{ path: 'tags', element: <Tags /> },
			...COMMON_ROUTES,
		],
	},
]

export { PUBLIC_ROUTES, PRIVATE_ROUTES }
