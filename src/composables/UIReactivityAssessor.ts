import percentage from "@/composables/percentage.ts";

export default function UIReactivityStateAssessor() {
    if (
        percentage(
            document.documentElement.clientWidth,
            window.screen.availWidth
        ) < 78
    ) {
        return 1;
    } else {
        return 0;
    }
}