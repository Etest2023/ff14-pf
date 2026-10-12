import { DpsStrs, HealerStrs, JobCNMap, TankStrs } from './constants';

const API_URL = 'https://xivpf.littlenightmare.top/api/';

// 添加前端私有数据、处理后端特异数据
const handleData = (data) => {
    if (!data) return data;
    if (data.error) return data;
    if (data.id) {
        data._timeLeft = formatTime(data.time_left);
        data._updateBefore = dateToPassedTime(data.updated_at);
        data.category === 'AdventuringForays' && (data.category = 'FieldOperations');
        data.duty === 'FATEs' && (data.duty = '所有地点');
    }
    return data;
}

function formatTime(second) {
    return parseInt(second / 60) + '分';
}
function dateToPassedTime(date) {
    const passedTime = new Date() - new Date(date);
    if (passedTime > 60 * 60 * 1000) {
        return '已过期';
    }
    if (passedTime > 60 * 1000) {
        return formatTime(passedTime / 1000) + '前';
    }
    return parseInt(passedTime / 1000) + '秒前';
}

export const getList = ({
    page,
    datacenter = '陆行鸟',
    category = 'HighEndDuty',
    pageSize = 10,
    search,
}) => {
    let url = `${API_URL}listings?page=${page}&per_page=${pageSize}&datacenter=${datacenter}&category=${encodeURIComponent(category)}`;
    if (search) {
        url += `&search=${encodeURIComponent(search)}`;
    }
    return fetch(url)
        .then((res) => res.json())
        .then((result) => {
            result?.data?.forEach((item) => {
                item._timeLeft = formatTime(item.time_left);
                item._updateBefore = dateToPassedTime(item.updated_at);
            });
            return result;
        });
};

const divider = '-';
export const getDetail = (id) => {
    return fetch(`${API_URL}listing/${id}`)
        .then((res) => res.json())
        .then((result) => {
            if (result.error) {
                return result;
            }
            result = handleData(result);

            result.slots.forEach((slot) => {
                if (!slot.job) return;

                slot._jobCN = '';
                let jobCNList = [];
                const _jobList = slot.job.split(' ');

                TankStrs.forEach((item) => {
                    if (_jobList.includes(item)) {
                        jobCNList.push(JobCNMap[item] || item);
                        _jobList.splice(_jobList.indexOf(item), 1);
                    }
                });
                slot._jobCN += jobCNList.join('');
                jobCNList = [];

                HealerStrs.forEach((item) => {
                    if (_jobList.includes(item)) {
                        jobCNList.push(JobCNMap[item] || item);
                        _jobList.splice(_jobList.indexOf(item), 1);
                    }
                });
                if (slot._jobCN.length > 0 && jobCNList.length > 0) {
                    slot._jobCN += divider;
                }
                slot._jobCN += jobCNList.join('');
                jobCNList = [];

                DpsStrs.forEach((item) => {
                    if (_jobList.includes(item)) {
                        jobCNList.push(JobCNMap[item] || item);
                        _jobList.splice(_jobList.indexOf(item), 1);
                    }
                });
                if (slot._jobCN.length > 0 && jobCNList.length > 0) {
                    slot._jobCN += divider;
                }
                slot._jobCN += jobCNList.join('');

                if (_jobList.length > 0) {
                    slot._jobCN += divider;
                    slot._jobCN += _jobList.join(' ');
                }
            });
            return result;
        });
};
