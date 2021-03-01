import React from 'react';

const styles = {
    section: 'text-gray-600 body-font',
    wrapper: 'container px-5 mx-auto flex flex-wrap',

    stepWrapper: 'flex relative py-10 sm:items-center w-full md:w-2/3 mx-auto',
    pointerWrapper: 'h-full w-6 absolute inset-0 flex items-center justify-center',
    stripe: 'h-full w-1 bg-blue-200 pointer-events-none',
    pointer: 'flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm',
    pointContent: 'flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row',
    icon: 'flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center',
    paragraph: 'flex-grow sm:pl-6 mt-6 sm:mt-0',
    title: 'font-medium title-font text-gray-900 mb-1 text-xl',
}

const svgIcons = {
    shield: (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
             strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
    ),
    pulse: (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
             strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
    ),
    anchor: (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
             strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="3"/>
            <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"/>
        </svg>
    ),
    human: (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
             strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    )
}

const steps = [
    {
        point: 1,
        icon: svgIcons.shield,
        title: 'Sign In',
        text: 'To get access to all actions (add, update and delete records) you must create an account and log in. Without authorization you can only see content of database and check geolocation data without saving it to database.'
    },
    {
        point: 2,
        icon: svgIcons.pulse,
        title: 'Provide URL or IP',
        text: 'In the \'Content\' you can see a table with all records from database and text input - here you can provide your IP or URL and click "Create New". Then popup menu shows up and you can see data and provide correction if needed. When you will click "Ok" then record will be added to database.'
    },
    {
        point: 3,
        icon: svgIcons.anchor,
        title: 'Go CRUD',
        text: 'When you click on record in database you will se the same editing menu as while adding - but here you can also update and delete record.'
    },
    {
        point: 4,
        icon: svgIcons.human,
        title: 'Created by',
        text: 'Mateusz Gackowski'
    }
]
const Description = () => (
    <section className={styles.section}>
        <div className={styles.wrapper}>
            {steps.map((step, index) => (
                <div key={index} className={(styles.stepWrapper)}>
                    <div className={styles.pointerWrapper}>
                        <div className={styles.stripe}/>
                    </div>
                    <div className={styles.pointer}>{step.point}</div>
                    <div className={styles.pointContent}>
                        <div className={styles.icon}>
                            {step.icon}
                        </div>
                        <div className={styles.paragraph}>
                            <h2 className={styles.title}>{step.title}</h2>
                            <p className="leading-relaxed">{step.text}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
)

export default Description;