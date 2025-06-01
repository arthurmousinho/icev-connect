import { UnauthorizedException } from '@nestjs/common';

export class DomainNotAllowedException extends UnauthorizedException {
    constructor(domain: string) {
        super(`O domínio ${domain} não tem acesso a este sistema.`);
        this.name = 'DomainNotAllowedException';
    }
}