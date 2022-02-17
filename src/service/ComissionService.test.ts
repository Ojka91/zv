
import ComissionService from './ComissionService';

test('Comission id 42 ok', () => {
    const comissionService = new ComissionService();
    expect(comissionService.checkClientDiscount(42)).toStrictEqual({
        hasDiscount: true, 
        amount: 0.05
    });
});

test('Comission not 42 ok', () => {
    const comissionService = new ComissionService();
    expect(comissionService.checkClientDiscount(123)).toStrictEqual({
        hasDiscount: false, 
        amount: 0
    });
});