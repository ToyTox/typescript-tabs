import Tabs from './tabs';

export default class GroupTabs {
  readonly wrapper: HTMLDivElement;
  tabDOMElem?: HTMLLIElement | NodeListOf<HTMLLIElement>;
  tabs: Tabs[];
  currentTab: number;
  init: any;
  start_active: any;
  calc_height_all_tabs: any;

  constructor(wrapper: HTMLDivElement, currentTab: number) {
    this.wrapper = wrapper;
    this.tabs = [];
    this.currentTab = currentTab;
    this.init = this.initTabs();
    this.start_active = this.startActive();
    // this.calc_height_all_tabs = this.calcHeightAllTabs();
  }

  public initTabs(): void {
    const groupTabs = this;
    this.tabDOMElem = document.querySelectorAll('[data-tabs-item]');

    this.tabDOMElem.forEach((item: HTMLLIElement, idx: number) => {
      const id: number = idx + 1;
      const tabContent: HTMLDivElement = <HTMLDivElement>(
        item.querySelector('[data-tabs-text]')
      );
      const tabContentHeight: number = tabContent.offsetHeight;
      const tabDataValue: string | null = item.getAttribute('data-tabs-item');
      const tabPicture: HTMLDivElement = <HTMLDivElement>(
        this.wrapper.querySelector(`[data-tabs-pic="${tabDataValue}"]`)
      );
      const progressBarContainer: HTMLDivElement = <HTMLDivElement>(
        item.querySelector('[data-tabs-progress]')
      );
      const progressBarNode: HTMLSpanElement = <HTMLSpanElement>(
        item.querySelector('.progress-bar')
      );

      this.tabs.push(
        new Tabs(
          groupTabs,
          id,
          item,
          tabContent,
          tabContentHeight,
          tabPicture,
          progressBarContainer,
          progressBarNode
        )
      );
    });
  }

  public startActive(): void {
    // console.log(this.tabs);
    // console.log(this.currentTab);
    const activeTab: Tabs = <Tabs>this.tabs.find((tab) => tab.id === this.currentTab);
    // console.log(activeTab);
    activeTab.setActive();
  }

  public removeActive(): void {
    const activeTab: Tabs = <Tabs>this.tabs.find((tab) => tab.id === this.currentTab);
    activeTab.setInactive();
  }

  public switchActiveTab(): void {
    if (this.currentTab >= this.tabs.length) {
      const activeTab: Tabs = <Tabs>this.tabs.find((tab) => tab.id === 1);
      activeTab.setActive();
    } else {
      const activeTab: Tabs = <Tabs>(
        this.tabs.find((tab) => tab.id === this.currentTab + 1)
      );
      activeTab.setActive();
    }
  }

  public findHighestTab(): number {
    let highest: number = this.tabs[0].tabContentHeight;

    this.tabs.forEach((tab) => {
      if (highest < tab.tabContentHeight) {
        highest = tab.tabContentHeight;
      }
    });

    return highest;
  }

  public calcHeightAllTabs(): void {
    const highest: any = this.findHighestTab();
    const contentListHeight: HTMLLIElement = <HTMLLIElement>(
      this.wrapper.querySelector('.content__list')
    );
    const conHeight: number = contentListHeight.offsetHeight + highest;

    this.wrapper.style.height = conHeight + 'px';
  }

  // this.tabs.forEach((tab) => {
  //   tab.text('message');
  // });
  //
  // console.log(this.tabs);
}

// window.addEventListener('load', () => {
//     const wrappers = document.querySelectorAll('[data-tab-group]');
//
//     class GroupTabs {
//         constructor(wrapper) {
//             this.wrapper = wrapper;
//             this.tabs = [];
//             this.init = this.initTabs();
//             this.currentTab = 1; //null
//             this.startActive();
//             this.calcHeightAllTabs();
//         }
//
//         initTabs() {
//             const groupTabs = this;
//             const tabs = this.wrapper.querySelectorAll('[data-tabs-item]');
//
//             tabs.forEach((item, idx) => {
//                 const id = idx + 1;
//                 const tabContent = item.querySelector('[data-tabs-text]');
//                 const tabContentHeight = tabContent.offsetHeight;
//                 const tabDataValue = item.getAttribute('data-tabs-item');
//                 const tabPicture = this.wrapper.querySelector(`[data-tabs-pic="${tabDataValue}"]`);
//                 const progressBarContainer = item.querySelector('[data-tabs-progress]');
//                 const progressBarNode = item.querySelector('.progress-bar');
//
//                 this.tabs.push(new Tabs(groupTabs, id, item, tabContent, tabContentHeight, tabPicture, progressBarContainer, progressBarNode));
//             })
//         }
//
//         startActive() {
//             const activeTab = this.tabs.find(tab => tab.id === this.currentTab)
//             activeTab.setActive()
//         }
//
//         removeActive() {
//             const activeTab = this.tabs.find(tab => tab.id === this.currentTab)
//             activeTab.setInactive();
//         }
//
//         switchActiveTab() {
//             if (this.currentTab >= this.tabs.length) {
//                 const activeTab = this.tabs.find(tab => tab.id === 1)
//                 activeTab.setActive()
//             } else {
//                 const activeTab = this.tabs.find(tab => tab.id === this.currentTab + 1)
//                 activeTab.setActive()
//             }
//         }
//
//         findHighestTab() {
//             let highest = this.tabs[0].tabContentHeight;
//
//             this.tabs.forEach(tab => {
//                 if (highest < tab.tabContentHeight) {
//                     highest = tab.tabContentHeight;
//                 }
//             })
//
//             return highest;
//         }
//
//         calcHeightAllTabs() {
//             const highest = this.findHighestTab();
//             const contentListHeight = this.wrapper.querySelector('.content__list');
//             const conHeight = contentListHeight.offsetHeight + highest;
//
//             this.wrapper.style.height = conHeight + 'px';
//         }
//     }
//
//     class Tabs {
//         constructor(groupTab, id, tab, tabContent, tabContentHeight, tabPicture, progressBarContainer, progressBarNode) {
//             this.id = id;
//             this.groupTab = groupTab;
//             this.tab = tab;
//             this.tabContent = tabContent;
//             this.tabContentHeight = tabContentHeight;
//             this.tabPicture = tabPicture;
//             this.progressBarContainer = progressBarContainer;
//             this.progressBarNode = progressBarNode;
//             this.progress = null
//             this.stateOfProgressbar = 0;
//             this.closeTab();
//         }
//
//         closeTab() {
//             if (!this.tab.classList.contains('active')) {
//                 // this.tabContent.style.height = '0';
//                 this.tabContent.classList.remove('show');
//                 this.tabContent.classList.add('hide');
//             } else {
//                 // this.tabContent.style.height = this.tabContentHeight + 'px';
//                 this.tabContent.classList.remove('hide');
//                 this.tabContent.classList.add('show');
//             }
//         }
//
//         setActive() {
//             if (!this.tab.classList.contains('active')) {
//                 this.groupTab.removeActive();
//                 clearInterval(this.progress);
//                 this.tab.classList.add('active');
//                 // this.tabContent.style.height = this.tabContentHeight + 'px';
//                 this.tabContent.classList.remove('hide');
//                 this.tabContent.classList.add('show');
//                 this.tabPicture.classList.add('active');
//                 this.groupTab.currentTab = this.id;
//                 this.setProgressBar(this.progressBarNode, 0);
//             }
//         }
//
//         setInactive() {
//             this.tab.classList.remove('active');
//             // this.tabContent.style.height = '0';
//             this.tabContent.classList.remove('show')
//             this.tabContent.classList.add('hide')
//             this.tabPicture.classList.remove('active');
//             clearInterval(this.progress);
//             this.progressBarNode.style.height = 0;
//             this.stateOfProgressbar = 0;
//             // this.progressBarContainer.innerHTML = '';
//         }
//
//         pauseProgress() {
//             if (this.tab.classList.contains('active')) {
//                 clearInterval(this.progress);
//                 this.progress = null;
//             }
//         }
//
//         playProgress() {
//             if (this.tab.classList.contains('active') && !this.progress) {
//                 this.setProgressBar(this.progressBarNode, this.stateOfProgressbar);
//             }
//         }
//
//         // setProgressBar(rootElement, progressState) {
//         setProgressBar(element, progressState) {
//             // const progressBarNode = document.createElement('span');
//             // progressBarNode.classList.add('progress-bar');
//             // rootElement.append(progressBarNode);
//             // let width = 1;
//             // this.stateOfProgressbar = 1;
//             element.style.height = '4px';
//             const v = this;
//             this.progress = setInterval(progressStatus, 10)
//
//             // function progressStatus() {
//             //     if (width >= 100) {
//             //         clearInterval(this.progress)
//             //         progressBarNode.remove();
//             //         v.groupTab.switchActiveTab();
//             //     } else {
//             //         width = width + 0.25;
//             //         progressBarNode.style.width = width + '%';
//             //     }
//             // }
//             function progressStatus() {
//                 if (progressState >= 100) {
//                     clearInterval(this.progress)
//                     progressState = 0;
//                     v.stateOfProgressbar = 0;
//                     // progressBarNode.remove();
//                     element.style.height = '0';
//                     // v.groupTab.switchActiveTab();
//                 } else {
//                     progressState = progressState + 0.25;
//                     v.stateOfProgressbar = progressState;
//                     element.style.width = progressState + '%';
//                 }
//             }
//         }
//     }
//
//     const groupsTabs = []
//
//     wrappers.forEach((item) => {
//         groupsTabs.push(new GroupTabs(item));
//     })
//
//     groupsTabs.forEach(group => {
//         group.tabs.forEach(item => {
//             item.tab.addEventListener('click', item.setActive.bind(item))
//         })
//
//         group.tabs.forEach(item => {
//             item.tab.addEventListener('mouseenter', item.pauseProgress.bind(item))
//         })
//
//         group.tabs.forEach(item => {
//             item.tab.addEventListener('mouseleave', item.playProgress.bind(item))
//         })
//     })
// });
