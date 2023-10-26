import betagouv from "@/betagouv";
import knex from "@/db";
import { DBUserDetail, DBUser, statusOptions, genderOptions } from "@/models/dbUser/dbUser";
import { fetchCommuneDetails } from "@/lib/searchCommune";
import config from "@/config";
import { computeHash } from "../utils";

export async function getDetailInfoUpdate(req) {
    try {
      const [dbUser, dbUserDetail] : [DBUser, DBUserDetail] = await Promise.all([
        (async () => {
          const rows = await knex('users').where({ username: req.auth.id });
          return rows.length === 1 ? rows[0] : null;
        })(),
        (async () => {
          const hash = computeHash(req.auth.id)
          const rows = await knex('user_details').where({ hash });
          return rows.length === 1 ? rows[0] : {};
        })(),
      ]);
      const title = 'Mon compte';
      const formValidationErrors = {}
      const startups = await betagouv.startupsInfos();
      const startupOptions = startups.map(startup => {
        return {
          value: startup.id,
          label: startup.attributes.name
        }
      })
      return {
          title,
          formValidationErrors,
          currentUserId: req.auth.id,
          startups,
          genderOptions,
          statusOptions,
          startupOptions,
          isAdmin: config.ESPACE_MEMBRE_ADMIN.includes(req.auth.id),
          activeTab: 'account',
          communeInfo: dbUser.workplace_insee_code ? await fetchCommuneDetails(dbUser.workplace_insee_code) : null,
          formData: {
            gender: dbUserDetail.gender,
            workplace_insee_code: dbUser.workplace_insee_code,
            tjm: dbUserDetail.tjm,
            legal_status: dbUser.legal_status,
            secondary_email: dbUser.secondary_email,
            osm_city: dbUser.osm_city,
            average_nb_of_days: dbUserDetail.average_nb_of_days
          },
          // errors: req.flash('error'),
          // messages: req.flash('message'),
          // request: req
        }
    } catch (err) {
      console.error(err);
      throw new Error(`Impossible de récupérer vos informations. ${err}`)
      // req.flash('error', 'Impossible de récupérer vos informations.');
      // return res.redirect('/');
    }
  }
  