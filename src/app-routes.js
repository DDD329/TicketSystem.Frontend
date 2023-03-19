import { HomePage, TicketsPage, NewTicketPage } from './pages';
import { withNavigationWatcher } from './contexts/navigation';

const routes = [
    {
        path: '/tickets',
        element: TicketsPage
    },
    {
        path: '/newTicket',
        element: NewTicketPage
    },
    {
        path: '/home',
        element: HomePage
    }
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
