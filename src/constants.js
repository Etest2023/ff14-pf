// 雪碧图位于 public/，index.html 中有对应的 preload 链接
const jobsSpriteUrl = import.meta.env.BASE_URL + 'jobs-sprite.png';

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

// 职业图标雪碧图：560x504，10 列 9 行，单元格 56px
// 索引 0-42 为 base 图标，43-85 为 filled 图标，顺序与 JOB_NAMES 一致
const JOB_NAMES = [
    'ACN', 'ALC', 'ARC', 'ARM', 'AST', 'BLM', 'BLU', 'BRD', 'BSM', 'BST',
    'BTN', 'CNJ', 'CRP', 'CUL', 'DNC', 'DRG', 'DRK', 'FSH', 'GLA', 'GNB',
    'GSM', 'LNC', 'LTW', 'MCH', 'MIN', 'MNK', 'MRD', 'NIN', 'PCT', 'PGL',
    'PLD', 'RDM', 'ROG', 'RPR', 'SAM', 'SCH', 'SGE', 'SMN', 'THM', 'VPR',
    'WAR', 'WHM', 'WVR',
];
const SPRITE_COLS = 10;
const SPRITE_CELL = 56;
const SPRITE_W = 560;
const SPRITE_H = 504;
const SLOT_SIZE = 32; // ThePartySlots 的 --var-slot-size

// 返回雪碧图背景样式。未填充图标显示为槽位的 80%（对应 .slot 的 background-size: 80%），
// filled 铺满（对应 background-size: cover）
export const getJobIconStyle = (name, filled = false) => {
    const idx = JOB_NAMES.indexOf(name);
    if (idx === -1) return {};
    const index = filled ? idx + JOB_NAMES.length : idx;
    const col = index % SPRITE_COLS;
    const row = Math.floor(index / SPRITE_COLS);
    const display = filled ? SLOT_SIZE : SLOT_SIZE * 0.8;
    const scale = display / SPRITE_CELL;
    const offset = (SLOT_SIZE - display) / 2;
    return {
        backgroundImage: `url(${jobsSpriteUrl})`,
        backgroundSize: `${SPRITE_W * scale}px ${SPRITE_H * scale}px`,
        backgroundPosition: `${offset - col * display}px ${offset - row * display}px`,
    };
};
