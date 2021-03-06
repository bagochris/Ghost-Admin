import Component from '@glimmer/component';
import {get} from '@ember/object';
import {inject as service} from '@ember/service';

export default class GhContentfilterComponent extends Component {
    @service customViews;
    @service router;

    get showCustomViewManagement() {
        let isOwnerOrAdmin = get(this.args.currentUser || {}, 'isOwnerOrAdmin');
        let onPostsScreen = this.router.currentRouteName === 'posts';
        let isDefaultView = this.customViews?.activeView?.isDefault;
        let hasFilter = this.args.selectedType.value
            || this.args.selectedAuthor.slug
            || this.args.selectedTag.slug
            || this.args.selectedOrder.value;

        return isOwnerOrAdmin && onPostsScreen && !isDefaultView && hasFilter;
    }

    calculateActionsDropdownPosition(trigger, content) {
        let {top, left, width, height} = trigger.getBoundingClientRect();
        // content.firstElementChild is required because we use .dropdown-menu which is absolute positioned
        let {width: contentWidth} = content.firstElementChild.getBoundingClientRect();

        let style = {
            left: left + width - contentWidth,
            top: top + height + 5
        };

        return {style};
    }
}
