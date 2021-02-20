import DragItem from './DragItem';

class DataCenter {
  private dragList = new Map();

  private TransferDataName = 'id'

  public getData(e: DragEvent) {
    const id = e.dataTransfer?.getData(this.TransferDataName);
    if (id) {
      return this.dragList.get(id);
    }
    return null;
  }

  public setData(e: DragEvent, dragItem: any) {
    const settledId = dragItem.uid.toString();
    this.dragList.set(settledId, dragItem.data);
    e.dataTransfer?.setData(this.TransferDataName, settledId);
  }
}

export default DataCenter;
