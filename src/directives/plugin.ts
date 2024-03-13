export default {
    install(app, options) {
        const modules: Record<string, any> = import.meta.glob(
            ["./*.js", "!./plugin.ts"],
            {
                eager: true
            }
        )
        for (const modulesKey in modules) {
            modules[modulesKey].default(app)
        }
    }
}
