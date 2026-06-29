import { Container } from '@components/common';
import { ABOUT_TEAM } from '@data/about';

const AboutTeam = () => {
  return (
    <Container className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Passionate individuals working together to transform agriculture and food distribution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ABOUT_TEAM.map((member) => (
          <div key={member.id} className="text-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {member.name}
            </h3>
            <p className="text-primary-600 dark:text-primary-400 mb-2">{member.role}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default AboutTeam;
