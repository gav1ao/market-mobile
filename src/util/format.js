import Intl  from 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import moment from 'moment';
import 'moment/locale/pt-br';

export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export const formatDate = (date) => {
    moment('pt-br');
    return moment(date).format('L');
}