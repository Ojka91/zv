
import axios from 'axios';


const enum CURRENCY {
	EUR = "EUR",
    BASECOMISION = 0.5
  };


export default class ComissionService {

    constructor() {
     
    }

    public async applyComission(amount: string, currency: string, date: string): Promise<number> {
        let ratio = 1;
        if (currency != CURRENCY.EUR) {
            ratio = await this.exchangeCurrency(currency, date);
        }

        const amountInEuros = parseInt(amount) / ratio;

        return (amountInEuros * CURRENCY.BASECOMISION) / 100 
    }

    public checkClientDiscount(id: number) {
        if (id === 42) {
            return {
                hasDiscount: true, 
                amount: 0.05
            };
        }
        return {
            hasDiscount: false, 
            amount: 0
        };
    }

    private async exchangeCurrency(currency: string, date: string): Promise<number> {
        try {
            var url = process.env.EXCHANGE + '/' + date;
            var response = await axios.get<any>(url);

            return response.data.rates[currency];

        } catch (error) {
            throw new Error("Error retrieving data from exchange: " + error)   
        }
    }
    
}