import Component from 'ShopUi/models/component';
import AutocompleteForm, {Events as AutocompleteEvents} from 'ShopUi/components/molecules/autocomplete-form/autocomplete-form';
import AjaxProvider from 'ShopUi/components/molecules/ajax-provider/ajax-provider';
import debounce from 'lodash-es/debounce';

export default class QuickOrderRow extends Component {
    ajaxProvider: AjaxProvider;
    autocompleteInput: AutocompleteForm;
    quantityInput: HTMLInputElement;
    errorMessage: HTMLElement;
    initialQuantityCheckPassed: Boolean;

    protected readyCallback(): void {
        this.ajaxProvider = <AjaxProvider>this.querySelector(`.${this.jsName}__provider`);
        this.autocompleteInput = <AutocompleteForm>this.querySelector('autocomplete-form');
        this.registerQuantityInput();
        this.mapEvents();
    }

    protected registerQuantityInput(): void {
        this.quantityInput = <HTMLInputElement>this.querySelector(`.${this.jsName}__quantity, .${this.jsName}-partial__quantity`);
        this.errorMessage = <HTMLElement>this.querySelector(`.${this.name}__error, .${this.name}-partial__error`);
    }

    protected mapEvents(): void {
        this.autocompleteInput.addEventListener(AutocompleteEvents.SET, (e: CustomEvent) => this.onAutocompleteSet(e));
        this.autocompleteInput.addEventListener(AutocompleteEvents.UNSET, (e: CustomEvent) => this.onAutocompleteUnset(e));
        this.mapQuantityInputChange();
    }

    protected mapQuantityInputChange(): void {
        this.quantityInput.addEventListener('input', debounce((e: Event) => this.onQuantityChange(e), this.autocompleteInput.debounceDelay));
    }

    protected onAutocompleteSet(e: CustomEvent) {
        this.reloadField(this.autocompleteInput.inputValue);
    }

    protected onAutocompleteUnset(e: CustomEvent) {
        this.reloadField();
    }

    protected onQuantityChange(e: Event) {
        this.reloadField(this.autocompleteInput.inputValue);
    }

    protected toggleErrorMessage(isShow: boolean): void {
        if (isShow) {
            const errorMessageClass = this.errorMessage.classList[0] + '--show';

            this.errorMessage.classList.add(errorMessageClass);
            setTimeout(() => this.errorMessage.classList.remove(errorMessageClass), 5000);
        }
    }

    protected isQuantityValid(): boolean {
        const quantityInputValue = Number(this.quantityValue);

        const result = this.initialQuantityCheckPassed && quantityInputValue === 0
            || this.quantityMax !== 0 && quantityInputValue > this.quantityMax
            || this.quantityValue !== '' && quantityInputValue < this.quantityMin
            || this.quantityStep > 1 && (quantityInputValue - this.quantityMin) % this.quantityStep !== 0;

        if (!this.initialQuantityCheckPassed) {
            this.initialQuantityCheckPassed = true;
        }

        return result;
    }

    async reloadField(sku: string = '') {
        const isShowErrorMessage = this.isQuantityValid(),
            quantityInputValue = parseInt(this.quantityValue);

        this.ajaxProvider.queryParams.set('sku', sku);
        this.ajaxProvider.queryParams.set('index', this.ajaxProvider.getAttribute('class').split('-').pop().trim());

        if (!!quantityInputValue) {
            this.ajaxProvider.queryParams.set('quantity', `${quantityInputValue}`);
        }

        await this.ajaxProvider.fetch();
        this.registerQuantityInput();
        this.mapQuantityInputChange();
        this.toggleErrorMessage(isShowErrorMessage);

        if (!!sku) {
            this.quantityInput.focus();
        }
    }

    get quantityValue(): string {
        return this.quantityInput.value;
    }

    get quantityMin(): number {
        return Number(this.quantityInput.getAttribute('min'));
    }

    get quantityMax(): number {
        return Number(this.quantityInput.getAttribute('max'));
    }

    get quantityStep(): number {
        return Number(this.quantityInput.getAttribute('step'));
    }
}
