import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import config from 'frontend-processendatabank/config/environment';

export default class BpmnFilesIndexController extends Controller {
  queryParams = ['page', 'name'];

  @tracked page = 0;
  size = 20;
  @tracked name = '';
  @tracked fileModalOpened = false;
  @tracked newFileId = undefined;

  get bpmnFiles() {
    return this.model.loadBpmnFilesTaskInstance.isFinished
      ? this.model.loadBpmnFilesTaskInstance.value
      : this.model.loadedBpmnFiles;
  }

  get isLoading() {
    return this.model.loadBpmnFilesTaskInstance.isRunning;
  }

  get hasNoResults() {
    return (
      this.model.loadBpmnFilesTaskInstance.isFinished &&
      this.bpmnFiles.length === 0
    );
  }

  get hasErrored() {
    return this.model.loadBpmnFilesTaskInstance.isError;
  }

  get postEndpoint() {
    return `${config.APP.apiHost}/bpmn-files`;
  }

  @action
  setName(selection) {
    this.page = null;
    this.name = selection;
  }

  @action
  resetFilters() {
    this.name = '';
    this.page = 0;

    // Triggers a refresh of the model
    this.page = null;
  }

  @action
  openFileModal() {
    this.newFileId = undefined;
    this.fileModalOpened = true;
  }

  @action
  closeFileModal() {
    this.fileModalOpened = false;
  }

  @action
  fileUploaded(newFileId) {
    this.closeFileModal();
    this.resetFilters();
    this.newFileId = newFileId;
  }

  @action
  closeAlert() {
    this.newFileId = undefined;
  }
}
