import UIKit

class KeyboardViewController: UIInputViewController {

    // MARK: - State
    private var selectedCategory: EmojiCategory = .recent
    private var searchQuery: String = ""
    private var favorites: Set<String> = []
    private var recentEmojis: [String] = []
    private var skinToneTarget: EmojiItem? = nil

    // MARK: - UI
    private let stackView = UIStackView()
    private let searchBar = UITextField()
    private let categoryScrollView = UIScrollView()
    private let categoryStack = UIStackView()
    private let skinToneBar = UIStackView()
    private let emojiCollectionView: UICollectionView
    private let bottomBar = UIStackView()

    private var displayEmojis: [EmojiItem] = []

    // MARK: - Layout constants
    private let emojiSize: CGFloat = 44
    private let columns: Int = 8

    required init?(coder: NSCoder) { fatalError() }

    override init(nibName: String?, bundle: Bundle?) {
        let layout = UICollectionViewFlowLayout()
        layout.minimumInteritemSpacing = 2
        layout.minimumLineSpacing = 2
        emojiCollectionView = UICollectionView(frame: .zero, collectionViewLayout: layout)
        super.init(nibName: nibName, bundle: bundle)
    }

    // MARK: - Lifecycle

    override func viewDidLoad() {
        super.viewDidLoad()
        loadStorage()
        buildUI()
        selectCategory(.recent)
    }

    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        updateEmojiItemSize()
    }

    // MARK: - Build UI

    private func buildUI() {
        view.backgroundColor = UIColor(white: 0.97, alpha: 1)

        stackView.axis = .vertical
        stackView.spacing = 0
        stackView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(stackView)

        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: view.topAnchor),
            stackView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            stackView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            stackView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])

        buildBottomBar()
        buildSearchBar()
        buildCategoryBar()
        buildSkinToneBar()
        buildEmojiGrid()

        // Re-order: bottom bar goes last
        stackView.removeArrangedSubview(bottomBar)
        stackView.addArrangedSubview(bottomBar)
    }

    private func buildBottomBar() {
        bottomBar.axis = .horizontal
        bottomBar.backgroundColor = UIColor(white: 0.9, alpha: 1)

        let switchBtn = makeButton(title: "🌐", size: 20, action: #selector(switchKeyboard))
        switchBtn.widthAnchor.constraint(equalToConstant: 44).isActive = true

        let spacer = UIView()
        spacer.setContentHuggingPriority(.defaultLow, for: .horizontal)

        let deleteBtn = makeButton(title: "⌫", size: 20, action: #selector(deleteBackward))
        deleteBtn.widthAnchor.constraint(equalToConstant: 44).isActive = true

        [switchBtn, spacer, deleteBtn].forEach { bottomBar.addArrangedSubview($0) }
        bottomBar.heightAnchor.constraint(equalToConstant: 36).isActive = true
        stackView.addArrangedSubview(bottomBar)
    }

    private func buildSearchBar() {
        let container = UIView()
        container.backgroundColor = .white
        container.heightAnchor.constraint(equalToConstant: 44).isActive = true

        searchBar.placeholder = "Search emojis..."
        searchBar.borderStyle = .roundedRect
        searchBar.returnKeyType = .search
        searchBar.clearButtonMode = .whileEditing
        searchBar.delegate = self
        searchBar.addTarget(self, action: #selector(searchChanged), for: .editingChanged)
        searchBar.translatesAutoresizingMaskIntoConstraints = false

        container.addSubview(searchBar)
        NSLayoutConstraint.activate([
            searchBar.leadingAnchor.constraint(equalTo: container.leadingAnchor, constant: 8),
            searchBar.trailingAnchor.constraint(equalTo: container.trailingAnchor, constant: -8),
            searchBar.centerYAnchor.constraint(equalTo: container.centerYAnchor),
        ])

        stackView.addArrangedSubview(container)
    }

    private func buildCategoryBar() {
        categoryScrollView.showsHorizontalScrollIndicator = false
        categoryScrollView.heightAnchor.constraint(equalToConstant: 44).isActive = true

        categoryStack.axis = .horizontal
        categoryStack.spacing = 0
        categoryStack.distribution = .fillEqually

        let allCats: [EmojiCategory] = [.recent, .smileys, .people, .nature, .food, .travel, .activities, .objects, .symbols]
        for cat in allCats {
            let btn = makeCategoryButton(category: cat)
            categoryStack.addArrangedSubview(btn)
        }

        categoryScrollView.addSubview(categoryStack)
        categoryStack.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            categoryStack.topAnchor.constraint(equalTo: categoryScrollView.topAnchor),
            categoryStack.bottomAnchor.constraint(equalTo: categoryScrollView.bottomAnchor),
            categoryStack.leadingAnchor.constraint(equalTo: categoryScrollView.leadingAnchor),
            categoryStack.trailingAnchor.constraint(equalTo: categoryScrollView.trailingAnchor),
            categoryStack.heightAnchor.constraint(equalTo: categoryScrollView.heightAnchor),
        ])

        stackView.addArrangedSubview(categoryScrollView)

        // Divider
        let divider = UIView()
        divider.backgroundColor = UIColor(white: 0.88, alpha: 1)
        divider.heightAnchor.constraint(equalToConstant: 1).isActive = true
        stackView.addArrangedSubview(divider)
    }

    private func buildSkinToneBar() {
        skinToneBar.axis = .horizontal
        skinToneBar.spacing = 4
        skinToneBar.distribution = .fillEqually
        skinToneBar.backgroundColor = UIColor(white: 0.94, alpha: 1)
        skinToneBar.isHidden = true
        skinToneBar.heightAnchor.constraint(equalToConstant: 48).isActive = true

        let tones = ["", "🏻", "🏼", "🏽", "🏾", "🏿"]
        let labels = ["✋", "✋🏻", "✋🏼", "✋🏽", "✋🏾", "✋🏿"]

        for (index, tone) in tones.enumerated() {
            let btn = UIButton(type: .system)
            btn.setTitle(labels[index], for: .normal)
            btn.titleLabel?.font = .systemFont(ofSize: 26)
            btn.tag = index
            btn.addTarget(self, action: #selector(skinToneSelected(_:)), for: .touchUpInside)
            skinToneBar.addArrangedSubview(btn)
        }

        stackView.addArrangedSubview(skinToneBar)
    }

    private func buildEmojiGrid() {
        emojiCollectionView.backgroundColor = .clear
        emojiCollectionView.register(EmojiCell.self, forCellWithReuseIdentifier: "emoji")
        emojiCollectionView.dataSource = self
        emojiCollectionView.delegate = self
        emojiCollectionView.contentInset = UIEdgeInsets(top: 4, left: 4, bottom: 4, right: 4)

        stackView.addArrangedSubview(emojiCollectionView)
        emojiCollectionView.heightAnchor.constraint(equalToConstant: 220).isActive = true
    }

    // MARK: - Category selection

    private func selectCategory(_ category: EmojiCategory) {
        selectedCategory = category
        searchQuery = ""
        searchBar.text = ""
        updateDisplay()
        updateCategoryHighlight()
    }

    private func updateDisplay() {
        displayEmojis = currentEmojis()
        emojiCollectionView.reloadData()
    }

    private func currentEmojis() -> [EmojiItem] {
        if !searchQuery.isEmpty {
            return EmojiDatabase.search(query: searchQuery)
        }
        if selectedCategory == .recent {
            return recentEmojis.map { EmojiItem(id: $0, emoji: $0, name: $0, category: .recent, keywords: [], hasSkinTones: false, skinToneVariants: []) }
        }
        return EmojiDatabase.byCategory(selectedCategory)
    }

    private func updateCategoryHighlight() {
        let allCats: [EmojiCategory] = [.recent, .smileys, .people, .nature, .food, .travel, .activities, .objects, .symbols]
        for (i, view) in categoryStack.arrangedSubviews.enumerated() {
            guard let btn = view as? UIButton else { continue }
            let cat = allCats[i]
            btn.backgroundColor = cat == selectedCategory ? UIColor(red: 0.23, green: 0.51, blue: 1, alpha: 0.15) : .clear
        }
    }

    // MARK: - Emoji actions

    private func handleEmojiTap(_ item: EmojiItem) {
        if item.hasSkinTones && !item.skinToneVariants.isEmpty {
            skinToneTarget = item
            skinToneBar.isHidden = false
        } else {
            insertEmoji(item.emoji)
        }
    }

    private func insertEmoji(_ emoji: String) {
        textDocumentProxy.insertText(emoji)
        addToRecent(emoji)
        skinToneBar.isHidden = true
        skinToneTarget = nil
        updateDisplay()
    }

    private func handleEmojiLongPress(_ item: EmojiItem) {
        toggleFavorite(item.emoji)
        updateDisplay()
    }

    @objc private func skinToneSelected(_ sender: UIButton) {
        guard let item = skinToneTarget else { return }
        let tones = ["", "🏻", "🏼", "🏽", "🏾", "🏿"]
        let tone = tones[sender.tag]
        let base = item.emoji.removingSkinTone()
        insertEmoji(base + tone)
    }

    // MARK: - Button actions

    @objc private func switchKeyboard() {
        advanceToNextInputMode()
    }

    @objc private func deleteBackward() {
        textDocumentProxy.deleteBackward()
    }

    @objc private func searchChanged() {
        searchQuery = searchBar.text ?? ""
        updateDisplay()
    }

    // MARK: - Storage

    private func loadStorage() {
        favorites = Set(loadFavoritesRaw().map { $0.emoji })
        recentEmojis = loadRecentRaw().map { $0.emoji }
    }

    private func storage() -> UserDefaults {
        // Use App Group so main app and extension share data
        return UserDefaults(suiteName: "group.com.moji.keyboard") ?? .standard
    }

    private struct StoredEmoji: Codable {
        let emoji: String
        let timestamp: Double
    }

    private func loadFavoritesRaw() -> [StoredEmoji] {
        guard let data = storage().data(forKey: "moji_favorites"),
              let decoded = try? JSONDecoder().decode([StoredEmoji].self, from: data)
        else { return [] }
        return decoded
    }

    private func loadRecentRaw() -> [StoredEmoji] {
        guard let data = storage().data(forKey: "moji_recent"),
              let decoded = try? JSONDecoder().decode([StoredEmoji].self, from: data)
        else { return [] }
        return decoded
    }

    private func addToRecent(_ emoji: String) {
        var recent = loadRecentRaw()
        recent.removeAll { $0.emoji == emoji }
        recent.insert(StoredEmoji(emoji: emoji, timestamp: Date().timeIntervalSince1970), at: 0)
        if recent.count > 25 { recent = Array(recent.prefix(25)) }
        if let data = try? JSONEncoder().encode(recent) {
            storage().set(data, forKey: "moji_recent")
        }
        recentEmojis = recent.map { $0.emoji }
    }

    private func toggleFavorite(_ emoji: String) {
        var favs = loadFavoritesRaw()
        if favs.contains(where: { $0.emoji == emoji }) {
            favs.removeAll { $0.emoji == emoji }
            favorites.remove(emoji)
        } else {
            favs.insert(StoredEmoji(emoji: emoji, timestamp: Date().timeIntervalSince1970), at: 0)
            if favs.count > 100 { favs = Array(favs.prefix(100)) }
            favorites.insert(emoji)
        }
        if let data = try? JSONEncoder().encode(favs) {
            storage().set(data, forKey: "moji_favorites")
        }
    }

    // MARK: - Helpers

    private func makeButton(title: String, size: CGFloat, action: Selector) -> UIButton {
        let btn = UIButton(type: .system)
        btn.setTitle(title, for: .normal)
        btn.titleLabel?.font = .systemFont(ofSize: size)
        btn.addTarget(self, action: action, for: .touchUpInside)
        return btn
    }

    private func makeCategoryButton(category: EmojiCategory) -> UIButton {
        let btn = UIButton(type: .system)
        btn.setTitle(category.icon, for: .normal)
        btn.titleLabel?.font = .systemFont(ofSize: 22)
        btn.addTarget(self, action: #selector(categoryTapped(_:)), for: .touchUpInside)
        btn.heightAnchor.constraint(equalToConstant: 44).isActive = true
        btn.widthAnchor.constraint(greaterThanOrEqualToConstant: 40).isActive = true
        return btn
    }

    @objc private func categoryTapped(_ sender: UIButton) {
        let allCats: [EmojiCategory] = [.recent, .smileys, .people, .nature, .food, .travel, .activities, .objects, .symbols]
        guard let idx = categoryStack.arrangedSubviews.firstIndex(of: sender),
              idx < allCats.count else { return }
        selectCategory(allCats[idx])
    }

    private func updateEmojiItemSize() {
        guard let layout = emojiCollectionView.collectionViewLayout as? UICollectionViewFlowLayout else { return }
        let available = emojiCollectionView.bounds.width - 8 - CGFloat(columns - 1) * 2
        let size = floor(available / CGFloat(columns))
        layout.itemSize = CGSize(width: size, height: size)
        layout.invalidateLayout()
    }
}

// MARK: - UICollectionView

extension KeyboardViewController: UICollectionViewDataSource, UICollectionViewDelegate {

    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        displayEmojis.count
    }

    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "emoji", for: indexPath) as! EmojiCell
        let item = displayEmojis[indexPath.item]
        cell.configure(emoji: item.emoji, isFavorite: favorites.contains(item.emoji))
        return cell
    }

    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        handleEmojiTap(displayEmojis[indexPath.item])
    }

    func collectionView(_ collectionView: UICollectionView, contextMenuConfigurationForItemAt indexPath: IndexPath, point: CGPoint) -> UIContextMenuConfiguration? {
        let item = displayEmojis[indexPath.item]
        return UIContextMenuConfiguration(identifier: nil, previewProvider: nil) { _ in
            let isFav = self.favorites.contains(item.emoji)
            let favoriteAction = UIAction(
                title: isFav ? "Remove Favorite" : "Add Favorite",
                image: UIImage(systemName: isFav ? "heart.slash" : "heart")
            ) { _ in
                self.handleEmojiLongPress(item)
            }
            return UIMenu(title: item.emoji, children: [favoriteAction])
        }
    }
}

// MARK: - UITextFieldDelegate

extension KeyboardViewController: UITextFieldDelegate {
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return false
    }
}

// MARK: - EmojiCell

class EmojiCell: UICollectionViewCell {
    private let label = UILabel()
    private let favDot = UIView()

    override init(frame: CGRect) {
        super.init(frame: frame)
        contentView.backgroundColor = UIColor(white: 0.95, alpha: 1)
        contentView.layer.cornerRadius = 6
        contentView.clipsToBounds = true

        label.font = .systemFont(ofSize: 26)
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(label)
        NSLayoutConstraint.activate([
            label.centerXAnchor.constraint(equalTo: contentView.centerXAnchor),
            label.centerYAnchor.constraint(equalTo: contentView.centerYAnchor),
        ])

        favDot.backgroundColor = .systemRed
        favDot.layer.cornerRadius = 4
        favDot.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(favDot)
        NSLayoutConstraint.activate([
            favDot.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 2),
            favDot.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -2),
            favDot.widthAnchor.constraint(equalToConstant: 8),
            favDot.heightAnchor.constraint(equalToConstant: 8),
        ])
    }

    required init?(coder: NSCoder) { fatalError() }

    func configure(emoji: String, isFavorite: Bool) {
        label.text = emoji
        favDot.isHidden = !isFavorite
    }
}

// MARK: - String helper

private extension String {
    func removingSkinTone() -> String {
        let tones: [Character] = ["🏻", "🏼", "🏽", "🏾", "🏿"]
        return String(self.filter { !tones.contains($0) })
    }
}
