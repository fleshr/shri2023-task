function Header() {
  let [expanded, setExpanded] = React.useState(false);
  let [toggled, setToggled] = React.useState(false);

  const onClick = () => {
    if (!toggled) {
      setToggled(true);
    }

    setExpanded(!expanded);
  };

  return (
    <header className="header">
      <a href="/" className="header__logo" aria-label="Яндекс.Дом"></a>
      <button
        className="header__menu"
        aria-expanded={expanded ? "true" : "false"}
        onClick={onClick}
      >
        <span className="header__menu-text a11y-hidden">
          {expanded ? "Закрыть меню" : "Открыть меню"}
        </span>
      </button>
      <ul
        className={
          "header__links" +
          (expanded ? " header__links_opened" : "") +
          (toggled ? " header__links-toggled" : "")
        }
      >
        <li className="header__item">
          <a
            className="header__link header__link_current"
            href="/"
            aria-current="page"
          >
            Сводка
          </a>
        </li>
        <li className="header__item">
          <a className="header__link" href="/devices">
            Устройства
          </a>
        </li>
        <li className="header__item">
          <a className="header__link" href="/scripts">
            Сценарии
          </a>
        </li>
      </ul>
    </header>
  );
}

function Event({ slim, icon, iconLabel, title, subtitle, fixedSize }) {
  return (
    <li className={"event" + (slim ? " event_slim" : "")}>
      <button
        className="event__button"
        style={{ width: fixedSize ? "200px" : "100%" }}
      >
        <span
          className={`event__icon event__icon_${icon}`}
          role="img"
          aria-label={iconLabel}
        ></span>
        <h4 className="event__title">{title}</h4>
        {subtitle && <span className="event__subtitle">{subtitle}</span>}
      </button>
    </li>
  );
}

function General() {
  return (
    <section className="section main__general">
      <h2 className="section__title section__title-header section__main-title">
        Главное
      </h2>
      <div className="hero-dashboard">
        <div className="hero-dashboard__primary">
          <h3 className="hero-dashboard__title">Привет, Геннадий!</h3>
          <p className="hero-dashboard__subtitle">
            Двери и окна закрыты, сигнализация включена.
          </p>
          <ul className="hero-dashboard__info">
            <li className="hero-dashboard__item">
              <div className="hero-dashboard__item-title">Дома</div>
              <div className="hero-dashboard__item-details">
                +23
                <span className="a11y-hidden">°</span>
              </div>
            </li>
            <li className="hero-dashboard__item">
              <div className="hero-dashboard__item-title">За окном</div>
              <div className="hero-dashboard__item-details">
                +19
                <span className="a11y-hidden">°</span>
                <div
                  className="hero-dashboard__icon hero-dashboard__icon_rain"
                  role="img"
                  aria-label="Дождь"
                ></div>
              </div>
            </li>
          </ul>
        </div>
        <ul className="hero-dashboard__schedule">
          <Event
            icon="temp"
            iconLabel="Температура"
            title="Philips Cooler"
            subtitle="Начнет охлаждать в 16:30"
          />
          <Event
            icon="light"
            iconLabel="Освещение"
            title="Xiaomi Yeelight LED Smart Bulb"
            subtitle="Включится в 17:00"
          />
          <Event
            icon="light"
            iconLabel="Освещение"
            title="Xiaomi Yeelight LED Smart Bulb"
            subtitle="Включится в 17:00"
          />
        </ul>
      </div>
    </section>
  );
}

function Scripts() {
  return (
    <section className="section main__scripts">
      <h2 className="section__title section__title-header">
        Избранные сценарии
      </h2>

      <ul className="event-grid">
        <Event
          slim={true}
          icon="light2"
          iconLabel="Освещение"
          title="Выключить весь свет в доме и во дворе"
        />
        <Event
          slim={true}
          icon="schedule"
          iconLabel="Расписание"
          title="Я ухожу"
        />
        <Event
          slim={true}
          icon="light2"
          iconLabel="Освещение"
          title="Включить свет в коридоре"
        />
        <Event
          slim={true}
          icon="temp2"
          iconLabel="Температура"
          title="Набрать горячую ванну"
          subtitle="Начнётся в 18:00"
        />
        <Event
          slim={true}
          icon="temp2"
          iconLabel="Температура"
          title="Сделать пол тёплым во всей квартире"
        />
      </ul>
    </section>
  );
}

function Panel({ name, items, isActive }) {
  const renderedRef = React.useRef(false);
  const ref = React.useRef();
  const [hasRightScroll, setHasRightScroll] = React.useState(false);
  const [shown, setShown] = React.useState(50);

  const handleListRender = (el) => {
    if (
      !renderedRef.current &&
      el?.offsetWidth &&
      items.length * 215 - 15 > el.offsetWidth
    ) {
      renderedRef.current = true;
      setHasRightScroll(true);
    }
  };

  const onArrowCLick = () => {
    ref.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  const handlePanelScroll = (e) => {
    const beShownCount =
      Math.ceil(
        (e.currentTarget.scrollLeft + e.currentTarget.offsetWidth + 15) / 215
      ) + 10;
    if (beShownCount > shown) setShown(beShownCount);
  };

  return (
    <div
      onScroll={handlePanelScroll}
      ref={ref}
      role="tabpanel"
      className={"section__panel" + (isActive ? "" : " section__panel_hidden")}
      aria-hidden={isActive ? "false" : "true"}
      id={`panel_${name}`}
      aria-labelledby={`tab_${name}`}
    >
      <ul
        style={{
          width: hasRightScroll ? `${items.length * 215 - 15}px` : "100%",
        }}
        ref={handleListRender}
        className="section__panel-list"
      >
        {items.slice(0, shown).map((item, index) => (
          <Event key={index} {...item} fixedSize={hasRightScroll} />
        ))}
      </ul>
      {hasRightScroll && (
        <div className="section__arrow" onClick={onArrowCLick}></div>
      )}
    </div>
  );
}

const TABS = {
  all: {
    title: "Все",
    items: [
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Yeelight LED Smart Bulb",
        subtitle: "Включено",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "D-Link Omna 180 Cam",
        subtitle: "Включится в 17:00",
      },
      {
        icon: "temp",
        iconLabel: "Температура",
        title: "Elgato Eve Degree Connected",
        subtitle: "Выключено до 17:00",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "LIFX Mini Day & Dusk A60 E27",
        subtitle: "Включится в 17:00",
      },
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Mi Air Purifier 2S",
        subtitle: "Включено",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "Philips Zhirui",
        subtitle: "Включено",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "Philips Zhirui",
        subtitle: "Включено",
      },
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Mi Air Purifier 2S",
        subtitle: "Включено",
      },
    ],
  },
  kitchen: {
    title: "Кухня",
    items: [
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Yeelight LED Smart Bulb",
        subtitle: "Включено",
      },
      {
        icon: "temp",
        iconLabel: "Температура",
        title: "Elgato Eve Degree Connected",
        subtitle: "Выключено до 17:00",
      },
    ],
  },
  hall: {
    title: "Зал",
    items: [
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "Philips Zhirui",
        subtitle: "Выключено",
      },
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Mi Air Purifier 2S",
        subtitle: "Выключено",
      },
    ],
  },
  lights: {
    title: "Лампочки",
    items: [
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "D-Link Omna 180 Cam",
        subtitle: "Включится в 17:00",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "LIFX Mini Day & Dusk A60 E27",
        subtitle: "Включится в 17:00",
      },
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Mi Air Purifier 2S",
        subtitle: "Включено",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "Philips Zhirui",
        subtitle: "Включено",
      },
    ],
  },
  cameras: {
    title: "Камеры",
    items: [
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Mi Air Purifier 2S",
        subtitle: "Включено",
      },
    ],
  },
};
for (let i = 0; i < 6; ++i) {
  TABS.all.items = TABS.all.items.concat(TABS.all.items);
}
const TABS_KEYS = Object.keys(TABS);

function Devices() {
  const initedRef = React.useRef(false);
  const [activeTab, setActiveTab] = React.useState("");

  React.useEffect(() => {
    if (!activeTab && !initedRef.current) {
      initedRef.current = true;
      setActiveTab(new URLSearchParams(location.search).get("tab") || "all");
    }
  });

  const onSelectInput = (event) => {
    setActiveTab(event.target.value);
  };

  return (
    <section className="section main__devices">
      <div className="section__title">
        <h2 className="section__title-header">Избранные устройства</h2>

        <select
          className="section__select"
          defaultValue="all"
          onInput={onSelectInput}
        >
          {TABS_KEYS.map((key) => (
            <option key={key} value={key}>
              {TABS[key].title}
            </option>
          ))}
        </select>

        <ul role="tablist" className="section__tabs">
          {TABS_KEYS.map((key) => (
            <li
              key={key}
              role="tab"
              aria-selected={key === activeTab ? "true" : "false"}
              tabIndex={key === activeTab ? "0" : undefined}
              className={
                "section__tab" +
                (key === activeTab ? " section__tab_active" : "")
              }
              id={`tab_${key}`}
              aria-controls={`panel_${key}`}
              onClick={() => setActiveTab(key)}
            >
              {TABS[key].title}
            </li>
          ))}
        </ul>
      </div>

      <div className="section__panel-wrapper">
        {TABS_KEYS.map((key) => (
          <Panel
            name={key}
            items={TABS[key].items}
            isActive={key === activeTab}
          />
        ))}
      </div>
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <>
    <Header />
    <main className="main">
      <General />
      <Scripts />
      <Devices />
    </main>
  </>
);
