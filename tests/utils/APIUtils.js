class APIUtils {

    constructor(apiContext, loginPayLoad){

        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;

    }

    async getToken(){

        //Login API
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginPayLoad
        }
        );

        const loginResponseJson = await loginResponse.json();

        const token = loginResponseJson.token;

        return token;
    }

    async createOrder(orderPayLoad){

        //Create Order API

        let response = {};

        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayLoad,
            headers:{
                
                'Authorization':response.token,
                'Content-Type':'application/json'
            }
        }
        );

        const orderResponseJson = await orderResponse.json();
        const orderId =  await orderResponseJson.orders[0];
        response.orderID=orderId;

        return response;

    }
}

module.exports = {APIUtils};