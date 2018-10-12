import Component from 'ShopUi/models/component';
import AjaxProvider from 'ShopUi/components/molecules/ajax-provider/ajax-provider';
import { mount } from 'ShopUi/app';

export default class QuickOrderForm extends Component {
    form: HTMLFormElement
    rows: HTMLElement
    addRowTrigger: HTMLElement
    removeRowTriggers: HTMLElement[]
    addRowAjaxProvider: AjaxProvider
    removeRowAjaxProvider: AjaxProvider

    readyCallback(): void {
        this.form = <HTMLFormElement>this.querySelector(`.${this.jsName}__form`);
        this.rows = <HTMLElement>this.querySelector(`.${this.jsName}__rows`);
        this.addRowTrigger = <HTMLElement>this.querySelector(`.${this.jsName}__add-row-trigger`);
        this.addRowAjaxProvider = <AjaxProvider>this.querySelector(`.${this.jsName}__add-row-provider`);
        this.removeRowAjaxProvider = <AjaxProvider>this.querySelector(`.${this.jsName}__remove-row-provider`);
        this.registerRemoveRowTriggers();
        this.mapEvents();
    }

    protected registerRemoveRowTriggers(): void {
        this.removeRowTriggers = <HTMLElement[]>Array.from(this.querySelectorAll(`.${this.jsName}__remove-row-trigger`));
    }

    protected mapEvents(): void {
        this.addRowTrigger.addEventListener('click', (event: Event) => this.onAddRowClick(event));
        this.mapRemoveRowTriggersEvents();
    }

    protected mapRemoveRowTriggersEvents(): void {
        this.removeRowTriggers.forEach((trigger: HTMLElement) => trigger.addEventListener('click', (event: Event) => this.onRemoveRowClick(event)));
    }

    protected onAddRowClick(event: Event): void {
        event.preventDefault();
        this.addRow();
    }

    protected onRemoveRowClick(event: Event): void {
        event.preventDefault();

        const row = <HTMLElement>event.currentTarget;
        const rowIndex = row.getAttribute('data-row-index');
        this.removeRow(rowIndex);
    }

    async addRow(): Promise<void> {
        const data = this.getFormData();
        const response = await this.addRowAjaxProvider.fetch(data);

        this.rows.innerHTML = response;
        await mount();
        this.registerRemoveRowTriggers();
        this.mapRemoveRowTriggersEvents();
    }

    async removeRow(rowIndex: string): Promise<void> {
        const data = this.getFormData({
            'row-index': rowIndex
        });
        const response = await this.removeRowAjaxProvider.fetch(data);

        this.rows.innerHTML = response;
        await mount();
        this.registerRemoveRowTriggers();
        this.mapRemoveRowTriggersEvents();
    }

    getFormData(appendData?: object): FormData {
        const data = new FormData(this.form);

        if (appendData) {
            Object.keys(appendData).forEach((key: string) => data.append(key, appendData[key]));
        }

        return data;
    }

}
