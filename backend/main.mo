import Array "mo:base/Array";
import Text "mo:base/Text";

actor {
    public type Translation = {
        original: Text;
        translated: Text;
        language: Text;
    };

    stable var translations : [Translation] = [];

    public func addTranslation(original: Text, translated: Text, language: Text) : async () {
        let newTranslation : Translation = {
            original = original;
            translated = translated;
            language = language;
        };
        translations := Array.append(translations, [newTranslation]);
    };

    public query func getTranslations() : async [Translation] {
        translations
    };
}
