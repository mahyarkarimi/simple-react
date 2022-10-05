export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const asyncThunkReducerBuilder = thunkFn => builder => {
    builder
        .addCase(thunkFn.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(thunkFn.fulfilled, (state, action) => {
            state.value = action.payload;
            state.isLoading = false;
            state.hasError = false
        })
        .addCase(thunkFn.rejected, (state, action) => {
            state.hasError = true
            state.isLoading = false;
        });
}