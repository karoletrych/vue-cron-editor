import { shallowMount } from "@vue/test-utils";
import VueCronEditorBuefy from "../../src/buefy/VueCronEditorBuefy.vue";
import Vue from "vue";

function getMountedComponent(Component: any, propsData: any) {
    return shallowMount(Component, {
        propsData
    });
}

describe("changing expression updates data", () => {
    it("when changing to expression from different tab, data is updated", async () => {
        let component = getMountedComponent(VueCronEditorBuefy, {
            value: "*/43 * * * *"
        });
        component.setProps({ value: "0 0 * * MON,WED,THU" });

        await Vue.nextTick();

        expect(component.vm.$data.currentTab).toBe("weekly");
        expect(component.vm.$data.editorData).toStrictEqual({
            days: ["MON", "WED", "THU"],
            hours: 0,
            minutes: 0,
            type: "weekly"
        });
    });
});
