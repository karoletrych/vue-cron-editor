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
        component.setProps({ value: "0 0 * * 1,3,4" });

        await Vue.nextTick();

        expect(component.vm.$data.currentTab).toBe("weekly");
        expect(component.vm.$data.editorData).toStrictEqual({
            days: ["1", "3", "4"],
            hours: 0,
            minutes: 0,
            type: "weekly"
        });
    });
});
