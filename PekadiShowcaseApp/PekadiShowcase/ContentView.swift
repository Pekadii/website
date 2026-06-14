import SwiftUI

struct ContentView: View {
    @State private var isLoading = true
    @State private var reloadToken = UUID()

    private let websiteURL = URL(string: "https://pekadi.com")!

    var body: some View {
        NavigationStack {
            WebsiteView(url: websiteURL, reloadToken: reloadToken, isLoading: $isLoading)
                .ignoresSafeArea(edges: .bottom)
                .navigationTitle("Pekadi")
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    ToolbarItem(placement: .topBarLeading) {
                        if isLoading {
                            ProgressView()
                        }
                    }

                    ToolbarItemGroup(placement: .topBarTrailing) {
                        Button {
                            reloadToken = UUID()
                        } label: {
                            Image(systemName: "arrow.clockwise")
                        }
                        .accessibilityLabel("Reload")

                        ShareLink(item: websiteURL) {
                            Image(systemName: "square.and.arrow.up")
                        }
                        .accessibilityLabel("Share")
                    }
                }
        }
    }
}
