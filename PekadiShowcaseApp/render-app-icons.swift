import AppKit
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

let sourcePath = "assets/ico/apple-touch-icon.png"
let outputDir = "PekadiShowcaseApp/PekadiShowcase/Assets.xcassets/AppIcon.appiconset"
let background = NSColor(red: 0.0, green: 0.015, blue: 0.02, alpha: 1.0)

let icons: [(size: Int, name: String)] = [
    (40, "Icon-20@2x.png"),
    (60, "Icon-20@3x.png"),
    (58, "Icon-29@2x.png"),
    (87, "Icon-29@3x.png"),
    (80, "Icon-40@2x.png"),
    (120, "Icon-40@3x.png"),
    (120, "Icon-60@2x.png"),
    (180, "Icon-60@3x.png"),
    (152, "Icon-76@2x.png"),
    (167, "Icon-83.5@2x.png"),
    (1024, "Icon-1024.png")
]

guard let source = NSImage(contentsOfFile: sourcePath) else {
    fatalError("Could not load \(sourcePath)")
}

let sourceRect = NSRect(origin: .zero, size: source.size)
guard let cgSource = source.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    fatalError("Could not create CGImage from \(sourcePath)")
}

for icon in icons {
    let colorSpace = CGColorSpaceCreateDeviceRGB()
    guard
        let context = CGContext(
            data: nil,
            width: icon.size,
            height: icon.size,
            bitsPerComponent: 8,
            bytesPerRow: 0,
            space: colorSpace,
            bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue
        )
    else {
        fatalError("Could not create context for \(icon.name)")
    }

    let rect = CGRect(x: 0, y: 0, width: icon.size, height: icon.size)
    context.setFillColor(background.cgColor)
    context.fill(rect)
    context.draw(cgSource, in: rect)

    let outputURL = URL(fileURLWithPath: outputDir).appendingPathComponent(icon.name)
    guard
        let rendered = context.makeImage(),
        let destination = CGImageDestinationCreateWithURL(outputURL as CFURL, UTType.png.identifier as CFString, 1, nil)
    else {
        fatalError("Could not prepare output for \(icon.name)")
    }

    CGImageDestinationAddImage(destination, rendered, nil)
    if !CGImageDestinationFinalize(destination) {
        fatalError("Could not write \(icon.name)")
    }
}
