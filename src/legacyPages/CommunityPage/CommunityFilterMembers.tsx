"use client";

import React from "react";
import axios from "axios";

import {
    ReactTabulator,
    ColumnDefinition,
    reactFormatter,
} from "react-tabulator";
import SEIncubateurSelect from "../../components/SEIncubateurSelect";
import SESelect from "../../components/SESelect";
import DomaineSelect from "../../components/DomaineSelect";
import MemberStatusSelect from "../../components/MemberStatusSelect";
import SEPhaseSelect from "../../components/SEPhaseSelect";
import { CommunityProps } from ".";
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme

function Link(props: any) {
    // props.cell._cell.row.data;
    const cellValue = props.cell._cell.value || "Edit | Show";
    return <a href={`/community/${cellValue}`}>{cellValue}@beta.gouv.fr</a>;
}

const columns: ColumnDefinition[] = [
    {
        title: "email",
        field: "id",
        width: 150,
        formatter: reactFormatter(<Link />),
    },
    { title: "fullname", field: "fullname" },
    { title: "startups", field: "startups", hozAlign: "center" },
    { title: "domaine", field: "domaine", hozAlign: "center" },
];

const css = ".panel { min-height: 400px; }"; // to have enough space to display dropdown

/* Pure component */
export const CommunityFilterMembers = (props: CommunityProps) => {
    const [state, setState] = React.useState<any>({
        users: [],
        selectedName: "",
        ...props,
    });

    const onClickSearch = async () => {
        const domaines = (state.domaines || []).map((d) => d.value).join(",");
        const incubators = (state.incubators || [])
            .map((d) => d.value)
            .join(",");
        const startups = (state.startups || []).map((d) => d.value).join(",");
        const memberStatus = (state.memberStatus || {}).value;
        const startupPhases = (state.startupPhases || [])
            .map((d) => d.value)
            .join(",");
        const params = {
            domaines,
            incubators,
            startups,
            memberStatus,
            startupPhases,
        };
        const queryParamsString = Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&");
        const data = await axios
            .get(`/api/get-users?${queryParamsString}`)
            .then((response) => response.data);
        setState({
            ...state,
            users: data.users,
        });
    };

    function exportToCsv(filename, rows) {
        const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
        const header = Object.keys(rows[0]);
        const csv = [
            header.join(";"), // header row first
            ...rows.map((row) =>
                header
                    .map((fieldName) =>
                        JSON.stringify(row[fieldName], replacer)
                    )
                    .join(";")
            ),
        ].join("\r\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        if (navigator["msSaveBlob"]) {
            // IE 10+
            navigator["msSaveBlob"](blob, filename);
        } else {
            const link = document.createElement("a");
            if (link.download !== undefined) {
                // feature detection
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = "hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    const onClickDownload = async () => {
        exportToCsv("users.csv", state.users);
    };

    return (
        <>
            <div>
                <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
                    <div className="fr-col-12">
                        <h3>Filtrer les membres</h3>
                    </div>
                </div>
                <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
                    <div className="fr-col-6">
                        <SEIncubateurSelect
                            incubators={props.incubatorOptions}
                            onChange={(incubators) =>
                                setState({
                                    ...state,
                                    incubators,
                                })
                            }
                        />
                    </div>
                    <div className="fr-col-6">
                        <SESelect
                            placeholder={"Sélectionne un ou plusieurs produits"}
                            isMulti={true}
                            startups={props.startupOptions}
                            onChange={(startups) =>
                                setState({
                                    ...state,
                                    startups,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
                    <div className="fr-col-6">
                        <DomaineSelect
                            domaines={props.domaineOptions}
                            onChange={(domaines) =>
                                setState({
                                    ...state,
                                    domaines,
                                })
                            }
                        />
                    </div>
                    <div className="fr-col-6">
                        <MemberStatusSelect
                            onChange={(memberStatus) =>
                                setState({
                                    ...state,
                                    memberStatus,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="fr-grid-row fr-grid-row--gutters">
                    <div className="fr-col-6">
                        <SEPhaseSelect
                            isMulti={true}
                            onChange={(startupPhases) =>
                                setState({
                                    ...state,
                                    startupPhases,
                                })
                            }
                        />
                    </div>
                </div>
                <br />
                <ButtonsGroup
                    buttons={[
                        {
                            children: "Chercher",
                            nativeButtonProps: {
                                onClick: onClickSearch,
                            },
                        },
                        {
                            children: "Télécharger",
                            nativeButtonProps: {
                                onClick: onClickDownload,
                                disabled: !state.users.length,
                            },
                            priority: "secondary",
                        },
                    ]}
                    inlineLayoutWhen="md and up"
                />
                <br />
                <br />
                <ReactTabulator
                    data-instance={"user-table"}
                    columns={columns}
                    data={state.users}
                    options={{ pagination: "local", paginationSize: 50 }}
                />
                <br />
                <br />
            </div>
        </>
    );
};
