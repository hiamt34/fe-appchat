import React, { useState } from 'react';
import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';
const Emoji = ({ setConten, conten }: { setConten: Function, conten: string }) => {
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event: any, emojiObject: any) => {
        setChosenEmoji(emojiObject);
        setConten(conten + emojiObject.emoji)
    };
    return (
        <div className='emoji-picker' style={{
            position: "absolute",
            bottom: '100%'
        }}>
            <Picker
                onEmojiClick={onEmojiClick}
                disableAutoFocus={true}
                skinTone={SKIN_TONE_NEUTRAL}
                groupNames={{ smileys_people: 'PEOPLE' }}
                native
            />
        </div>
    );
};

export default Emoji;