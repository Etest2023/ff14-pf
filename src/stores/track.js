import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getDetail } from '@/apis';

const trackIdsKey = 'ff14pf_track_ids';
const ss = sessionStorage.getItem(trackIdsKey) || '';

export const useTrackStore = defineStore('track', () => {
    const ssData = ss.length ? ss.split(',').map((i) => parseInt(i)) : [];
    const trackIds = ref(ssData || []);
    const trackList = ref([]);

    function addTrack(id, data) {
        trackIds.value.push(id);
        sessionStorage.setItem(trackIdsKey, trackIds.value.join(','));
        data && trackList.value.push(JSON.parse(JSON.stringify(data)));
    }
    function removeTrack(id) {
        trackIds.value = trackIds.value.filter((i) => i !== id);
        sessionStorage.setItem(trackIdsKey, trackIds.value.join(','));
        trackList.value = trackList.value.filter((i) => i.id !== id);
    }
    function refreshById(id) {
        if (!id) return Promise.reject();
        return getDetail(id).then((detail) => {
            if (!detail) {
                return detail;
            }
            if (detail.error) {
                trackList.value.find((item, index) => {
                    if (item.id === id) {
                        trackList.value[index].isExpired = true;
                        return true;
                    }
                });
                return detail;
            }
            if (detail.id === id) {
                trackList.value.find((item, index) => {
                    if (item.id === id) {
                        trackList.value[index] = detail;
                        return true;
                    }
                });
            }
            return detail;
        });
    }
    function refreshList() {
        return Promise.all(
            trackIds.value.map((id, index) => {
                if (!id) return Promise.reject();
                if (trackList.value[index]?.isExpired) {
                    //不再查询过期的招募
                    return Promise.resolve({ id });
                }
                return getDetail(id).then((detail) => ({ id, detail }));
            }),
        ).then((results) => {
            let isAdd = trackList.value.length === 0;
            results.forEach(({ id, detail }) => {
                if (!detail) {
                    return;
                }
                if (detail.error) {
                    const found = trackList.value.find((item, index) => {
                        if (item.id === id) {
                            trackList.value[index].isExpired = true;
                            return true;
                        }
                    });
                    if (!found) {
                        // 移除前后端均无数据的ID
                        removeTrack(id);
                    }
                    return;
                }
                if (isAdd) {
                    trackList.value.push(detail);
                    return;
                }
                if (detail.id === id) {
                    trackList.value.find((item, index) => {
                        if (item.id === id) {
                            trackList.value[index] = detail;
                            return true;
                        }
                    });
                }
            });
        });
    }
    return {
        trackIds,
        trackList,
        addTrack,
        removeTrack,
        refreshById,
        refreshList,
    };
});
