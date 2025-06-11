export enum TopicIconEnum {
    DEFAULT = 'DEFAULT',
    ALIGN_LEFT = 'ALIGN_LEFT',
    BOT = 'BOT',
    BRACES = 'BRACES',
    CPU = 'CPU',
    DATABASE = 'DATABASE',
    DATABASE_ZAP = 'DATABASE_ZAP',
    ETHERNET_PORT = 'ETHERNET_PORT',
    FILE_TEXT = 'FILE_TEXT',
    GAMEPAD_2 = 'GAMEPAD_2',
    GLOBE = 'GLOBE',
    LAYERS = 'LAYERS',
    LIST_CHECKS = 'LIST_CHECKS',
    MICROCHIP = 'MICROCHIP',
    MONITOR = 'MONITOR',
    NETWORK = 'NETWORK',
    SMARTPHONE = 'SMARTPHONE',
}

export type TopicIconType = keyof typeof TopicIconEnum;