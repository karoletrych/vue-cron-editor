import { shallowMount } from "@vue/test-utils";
import VueCronEditorBuefy from "../../src/buefy/VueCronEditorBuefy.vue";

function getMountedComponent(Component: any, propsData: any) {
    return shallowMount(Component, {
        propsData
    });
}

describe("changingSelectedTab", () => {
    it("triggers an $emit event", async () => {
        let component = getMountedComponent(VueCronEditorBuefy, {});
        await component.setData({ currentTab: "monthly" });
        let emitted = component.emitted("change-selected-tab");
        expect(emitted).toBeTruthy();
        expect(emitted && emitted[0][0]).toEqual({ id: "4", key: "monthly" });

        await component.setData({ currentTab: "weekly" });
        emitted = component.emitted("change-selected-tab");
        expect(emitted).toBeTruthy();
        expect(emitted && emitted[1][0]).toEqual({ id: "3", key: "weekly" });
    });
});
