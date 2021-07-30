export default class ctxLogic {
    constructor(mia) {
        this.fields = {};
        this.mia = mia;
    }

    async start() {
        this.addMethod(this);
    }
    set(slug, value) {
        this.fields[slug] = value;
    }
    method(slug, func) {
        this.fields[slug] = function (...args) { return func(this, ...args); };
    }
    apply(ctx) {
        Object.assign(ctx, this.fields);
    }

    addMethod(contextService) {
        contextService.set('mia', this.mia);
        contextService.set('db', this.mia.dbLogic);
        contextService.set('ds', this.mia.dsLogic.discord);
      }
}