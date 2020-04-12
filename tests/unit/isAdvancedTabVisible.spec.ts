import { shallowMount } from "@vue/test-utils";
import VueCronEditorBuefy from "../../src/buefy/VueCronEditorBuefy.vue";

function getMountedComponent(Component: any, propsData: any) {
    return shallowMount(Component, {
        propsData
    });
}

describe("VueCronEditorBuefy", () => {
    it("renders advanced tab when isAdvancedVisible is true", () => {
        let component = getMountedComponent(VueCronEditorBuefy, {
            isAdvancedTabVisible: true
        });
        expect(component.find(".advanced-tab").exists()).toBe(true);
    });

    it("does not render advanced tab when isAdvancedVisible is false", () => {
        let component = getMountedComponent(VueCronEditorBuefy, {
            isAdvancedTabVisible: false
        });
        expect(component.find(".advanced-tab").exists()).toBe(false);
    });
});
