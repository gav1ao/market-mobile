import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import DummyPage from './pages/dummy-page/dummy-page';
import Home from './pages/home/home';
import QRCodeReader from './pages/qrcode-reader/qrcode-reader';
import AddInvoiceCode from './pages/add-invoice-code/add-invoice-code';
import SearchProduct from './pages/search-product/search-product';

export default createAppContainer (
    createSwitchNavigator({
        Home,
        DummyPage,
        SearchProduct,
        QRCodeReader,
        AddInvoiceCode,
    })
);