function OptionModal({ title, message, list_button_title, list_button_callback, setRender, MapContext }) {
    if (list_button_callback.length != list_button_title.length) {
        return null;
    }

    return (
        <div className="modal-background">
            <div class="modal-box">
                <h3 class="modal-title">
                    {title} : {message}
                </h3>
                <div class="modal-button">
                    {console.log(MapContext)}
                    {list_button_title.map((tit, index) => {
                        return (
                            <button
                                class="modal-yes-button"
                                onClick={async () => {
                                    const callFunc = list_button_callback[index];
                                    await callFunc(MapContext);
                                    setRender(false);
                                }}
                            >
                                {tit}
                            </button>
                        );
                    })}
                    <button
                        class="modal-no-button"
                        onClick={() => {
                            setRender(false);
                        }}
                    >
                        Later
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OptionModal;
