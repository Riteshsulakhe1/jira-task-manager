import { DrawerMenuKeys, DrawerMenuItem } from "../Types/common";
import { PROJECT_ID_KEY, getBacklogRoute, getBoardRoute } from './routekeys';
export const drawerLinks: Array<DrawerMenuItem> = [
    {
        name: DrawerMenuKeys.BACKLOG,
        link: getBacklogRoute(PROJECT_ID_KEY),
    },
    {
        name: DrawerMenuKeys.BOARD,
        link: getBoardRoute(PROJECT_ID_KEY),
    },
    {
        name: DrawerMenuKeys.ISSUES,
        link: '',
    }
];