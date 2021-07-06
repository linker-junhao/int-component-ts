class DataCenter {
  private dragList = new Map();

  private TransferDataName = 'id'

  public static instance: DataCenter|null = null

  public constructor() {
    if (!DataCenter.instance) {
      DataCenter.instance = this;
    }
    return DataCenter.instance;
  }

  public getData(e: DragEvent) {
    const id = e.dataTransfer?.getData(this.TransferDataName);
    if (id) {
      return this.dragList.get(id);
    }
    throw new Error('outside drap event is not acceptable');
  }

  public setData(e: DragEvent, dragItem: any) {
    const settledId = dragItem.uid.toString();
    this.dragList.set(settledId, dragItem.data);
    e.dataTransfer?.setData(this.TransferDataName, settledId);
  }
}

const dataCenter = new DataCenter();

// eslint-disable-next-line import/prefer-default-export
export { DataCenter };
export default dataCenter;
