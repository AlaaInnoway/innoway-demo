const colors = ['purple', 'pink', 'blue', 'orange', 'green', 'red', 'yellow'];
export function getColor(index: number) {
    return colors[index];
}

export function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}