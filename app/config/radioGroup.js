import colors from './colors';

const radioConfig = [
    {
        color: colors.mainColor,
        labelStyle: { color: colors.mainColor },
        id: '1',
        label: 'Abierta',
        selected: true,
        size: 20,
        value: '1'
    },
    {
        color: colors.mainColor,
        labelStyle: { color: colors.mainColor },
        id: '2',
        label: 'Cerrada',
        size: 20,
        value: '2'
    },
    {
        color: colors.mainColor,
        labelStyle: { color: colors.mainColor },
        id: '3',
        label: 'Cancelada',
        size: 20,
        value: '3'
    }
];

export const getRadioConfigColor = (color) => {
    return radioConfig.map((item) => ({ ...item, color, labelStyle: { color }}));
};

export default radioConfig;
