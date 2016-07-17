namespace WBA {
	class Colors {
		public static Thing1: string = "#C2C2CF";
		public static Thing2: string = "#00841E";
		public static Thing3: string = "#00A41E";
		public static Thing4: string = "#FFA54A";
	}

	class Model {
		constructor() {
		}

		public GetSecureMessage(): JQueryPromise<string> {
			var d = jQuery.Deferred<string>();
			var model = this;

			jQuery.get("http://loripsum.net/api/5/short/decorate", function (message: string, textStatus: string) {
				d.resolve(message);
			}, "text");

			return d.promise();
		}
	}

	export interface IViewModelOptions extends IHiddenThingOptions {
	}

	export class ViewModel {
		private model: Model;

		public IsDisplayed: KnockoutObservable<boolean>;
		public SecureMessage: KnockoutObservable<string>;

		constructor(opts: IViewModelOptions) {
			if (!Boolean(opts))
				throw "ViewModel options are not specified!";

			this.model = new Model();
			this.IsDisplayed = ko.observable<boolean>(!opts.initialyHidden);
			this.SecureMessage = ko.observable<string>("There is something secure to hide...");
		}

		public Init(root: HTMLElement): void {
			var vm = this;

			ko.applyBindings(this, root);

			vm.model.GetSecureMessage().done(function (text: string) {
				vm.SecureMessage(text);
			});
		}

		public ShowMeTheTruth(): void {
			console.log("Changing secure thing visibility...");
			this.IsDisplayed(!this.IsDisplayed());
		}
	}
}