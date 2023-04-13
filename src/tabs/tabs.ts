export default class Tabs {
  readonly id: number;
  groupTab: any;
  tab: HTMLLIElement;
  tabContent: HTMLDivElement;
  tabContentHeight: number;
  tabPicture: HTMLPictureElement;
  progressBarContainer: HTMLDivElement;
  progressBarNode: HTMLSpanElement;
  progress: any;
  stateOfProgressbar: number = 0;
  close_tab: any;

  constructor(
    groupTab: any,
    id: number,
    tab: HTMLLIElement,
    tabContent: HTMLDivElement,
    tabContentHeight: number,
    tabPicture: HTMLPictureElement,
    progressBarContainer: HTMLDivElement,
    progressBarNode: HTMLSpanElement
  ) {
    this.groupTab = groupTab;
    this.id = id;
    this.tab = tab;
    this.tabContent = tabContent;
    this.tabContentHeight = tabContentHeight;
    this.tabPicture = tabPicture;
    this.progressBarContainer = progressBarContainer;
    this.progressBarNode = progressBarNode;
    this.close_tab = this.closeTab();
  }

  public closeTab(): void {
    if (!this.tab.classList.contains('active')) {
      // this.tabContent.style.height = '0';
      this.tabContent.classList.remove('show');
      this.tabContent.classList.add('hide');
    } else {
      // this.tabContent.style.height = this.tabContentHeight + 'px';
      this.tabContent.classList.remove('hide');
      this.tabContent.classList.add('show');
    }
  }

  public setActive(): void {
    if (!this.tab.classList.contains('active')) {
      this.groupTab.removeActive();
      clearInterval(this.progress);
      this.tab.classList.add('active');
      this.tabContent.style.height = this.tabContentHeight + 'px';
      this.tabContent.classList.remove('hide');
      this.tabContent.classList.add('show');
      this.tabPicture.classList.add('active');
      this.groupTab.currentTab = this.id;
      this.setProgressBar(this.progressBarNode, 0);
    }
  }

  public setInactive(): void {
    this.tab.classList.remove('active');
    // this.tabContent.style.height = '0';
    this.tabContent.classList.remove('show');
    this.tabContent.classList.add('hide');
    this.tabPicture.classList.remove('active');
    clearInterval(this.progress);
    this.progressBarNode.style.height = '0';
    this.stateOfProgressbar = 0;
    // this.progressBarContainer.innerHTML = '';
  }

  public pauseProgress(): void {
    if (this.tab.classList.contains('active')) {
      clearInterval(this.progress);
      this.progress = null;
    }
  }

  public playProgress(): void {
    if (this.tab.classList.contains('active') && !this.progress) {
      this.setProgressBar(this.progressBarNode, this.stateOfProgressbar);
    }
  }

  // setProgressBar(rootElement, progressState) {
  public setProgressBar(element: HTMLSpanElement, progressState: number): void {
    // const progressBarNode = document.createElement('span');
    // progressBarNode.classList.add('progress-bar');
    // rootElement.append(progressBarNode);
    // let width = 1;
    // this.stateOfProgressbar = 1;
    element.style.height = '4px';
    const v = this;
    this.progress = setInterval(progressStatus, 10);

    // function progressStatus() {
    //     if (width >= 100) {
    //         clearInterval(this.progress)
    //         progressBarNode.remove();
    //         v.groupTab.switchActiveTab();
    //     } else {
    //         width = width + 0.25;
    //         progressBarNode.style.width = width + '%';
    //     }
    // }
    function progressStatus() {
      if (progressState >= 100) {
        clearInterval(v.progress);
        progressState = 0;
        v.stateOfProgressbar = 0;
        // progressBarNode.remove();
        element.style.height = '0';
        v.groupTab.switchActiveTab();
      } else {
        progressState = progressState + 0.25;
        v.stateOfProgressbar = progressState;
        element.style.width = progressState + '%';
      }
    }
  }
}

// class Tabs {
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
