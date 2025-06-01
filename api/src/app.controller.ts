import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {

    @Get()
    public getHealth() {
        return {
            message: 'Olá Mundo! Bem-vindo ao API do iCEVConnect',
            status: 'ok',
            timestamp: new Date().toISOString()
        };
    }

}