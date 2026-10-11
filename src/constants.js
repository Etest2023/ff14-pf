export const themeKey = 'ff14pf_theme';

export const categoryMap = {
    DutyRoulette: '随机任务',
    Dungeons: '迷宫挑战',
    Guildhests: '行会令',
    Trials: '讨伐歼灭战',
    Raids: '大型任务',
    HighEndDuty: '高难度任务',
    Pvp: '玩家对战',
    GoldSaucer: '金碟游乐场',
    Fates: '危命任务',
    TreasureHunt: '寻宝',
    TheHunt: '怪物狩猎',
    GatheringForays: '采集活动',
    DeepDungeons: '深层迷宫',
    FieldOperations: '特殊场景探索',
    'V&C Dungeon Finder': '特殊迷宫探索',
    None: '其他',
};

export const strToCN = {
    PRACTICE: '练习',
    DUTY_COMPLETION: '完成任务',
    LOOT: '反复攻略',
    DUTY_COMPLETE: '任务已完成',
    DUTY_INCOMPLETE: '任务未完成',
};

export const TankStrs = ['PLD', 'WAR', 'DRK', 'GNB', 'GLA', 'MRD'];
export const HealerStrs = ['WHM', 'SCH', 'AST', 'SGE', 'CNJ'];
export const DpsStrs = [
    'MNK',
    'DRG',
    'NIN',
    'SAM',
    'RPR',
    'VPR',
    'BRD',
    'MCH',
    'DNC',
    'BLM',
    'SMN',
    'RDM',
    'PCT',
    'PGL',
    'LNC',
    'ROG',
    'ARC',
    'THM',
    'ACN',
    'BLU',
    'BST',
];

export const JobCNMap = {
    GLA: '剑',
    MRD: '斧',
    PLD: '骑',
    WAR: '战',
    DRK: '暗',
    GNB: '绝',

    CNJ: '幻',
    WHM: '白',
    SCH: '学',
    AST: '占',
    SGE: '贤',

    PGL: '拳',
    LNC: '枪',
    ROG: '双',
    DRG: '龙',
    MNK: '僧',
    NIN: '忍',
    RPR: '镰',
    SAM: '士',
    VPR: '蛇',

    ARC: '弓',
    BRD: '诗',
    DNC: '舞',
    MCH: '机',

    ACN: '秘',
    THM: '咒',
    BLM: '黑',
    RDM: '赤',
    SMN: '召',
    PCT: '画',

    BST: '兽',
    BLU: '青',
};

const taskImages = import.meta.glob('@tasks/*.webp', {
    import: 'default',
    eager: true,
});
const taskImageKeys = Object.keys(taskImages);
const taskImageNames = taskImageKeys.map(
    (key) => key.split('/').pop().split('.')[0],
);

export const getCategoryImgByName = (name) => {
    return (
        taskImages[taskImageKeys[taskImageNames.indexOf(categoryMap[name])]] ||
        ''
    );
};

const jobImages = import.meta.glob('@jobs/base/*.png', {
    import: 'default',
    eager: true,
});

const jobImageKeys = Object.keys(jobImages);
const jobImageNames = jobImageKeys.map(
    (key) => key.split('/').pop().split('.')[0],
);
export const getJobImgByName = (name, filled = false) => {
    let res = jobImages[jobImageKeys[jobImageNames.indexOf(name)]] || '';
    if (filled) res = res.replace('base/', 'filled/');
    return res;
};
