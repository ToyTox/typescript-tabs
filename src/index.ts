import './index.html';
import 'normalize.css';
import './style.scss';
import GroupTabs from './tabs/groupTabs';

// const test: HTMLElementTagNameMap
// const obj: Object = {
//   some: 'some'
// };

const wrappers: NodeListOf<HTMLDivElement> =
  document.querySelectorAll('[data-tab-group]');

const groupsTabs: GroupTabs[] = [];

wrappers.forEach((item, idx) => {
  groupsTabs.push(new GroupTabs(item, idx + 1));
});

groupsTabs.forEach((group) => {
  group.tabs.forEach((item) => {
    item.tab.addEventListener('click', item.setActive.bind(item));
  });

  group.tabs.forEach((item) => {
    item.tab.addEventListener('mouseenter', item.pauseProgress.bind(item));
  });

  group.tabs.forEach((item) => {
    item.tab.addEventListener('mouseleave', item.playProgress.bind(item));
  });
});
