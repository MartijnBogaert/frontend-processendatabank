import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class BpmnFilesController extends Controller {
  @service bpmnFileUpload;
  selectedFile = null;

  @action
  fileSelected(event) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  @action
  async submitFile(event) {
    event.preventDefault();
    if (this.selectedFile) {
      try {
        const response = await this.bpmnFileUpload.uploadFile(
          this.selectedFile,
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
