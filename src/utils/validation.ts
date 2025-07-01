 
import type { Rectangle } from "../types/Rectangle"

export function validateRectangle(rectangle: any): rectangle is Rectangle {
  return (
    typeof rectangle === "object" &&
    typeof rectangle.id === "string" &&
    typeof rectangle.x === "number" &&
    typeof rectangle.y === "number" &&
    typeof rectangle.width === "number" &&
    typeof rectangle.height === "number" &&
    typeof rectangle.fill === "string" &&
    typeof rectangle.stroke === "string" &&
    typeof rectangle.strokeWidth === "number" &&
    typeof rectangle.isSelected === "boolean" &&
    rectangle.id.length > 0 &&
    rectangle.width > 0 &&
    rectangle.height > 0 &&
    rectangle.strokeWidth >= 0
  )
}

export function validateRectangleUpdate(data: any): data is { id: string; x: number; y: number } {
  return (
    typeof data === "object" &&
    typeof data.id === "string" &&
    typeof data.x === "number" &&
    typeof data.y === "number" &&
    data.id.length > 0 &&
    !isNaN(data.x) &&
    !isNaN(data.y)
  )
}
