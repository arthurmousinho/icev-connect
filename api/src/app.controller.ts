import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {

    @Get()
    public getHealth() {
        return {
            message: 'Olá Mundo! Bem-vindo à API da plataforma iCEVConnect',
            status: 'ok',
            timestamp: new Date().toISOString()
        };
    }

}