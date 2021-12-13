
export class FormatUtility {

    public static Number(value: number): string {
        return `${value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`.replace('$', '');
    }
}